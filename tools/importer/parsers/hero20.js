/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per spec
  const headerRow = ['Hero (hero20)'];

  // --------- BACKGROUND IMAGE BLOCK (row 2) ----------
  // Select the 3x3 grid layout containing the images
  const gridContainer = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let backgroundContent;
  if (gridContainer) {
    // Reference the div so all images and their layout are passed to the cell
    backgroundContent = gridContainer;
  } else {
    // If not found, leave empty to handle edge case
    backgroundContent = '';
  }

  // --------- CONTENT BLOCK (row 3) ----------
  // Find the main content container (headings, subheading, CTAs)
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentCell = '';
  if (contentContainer) {
    // Gather all relevant content in order
    const content = [];
    // Primary heading
    const h1 = contentContainer.querySelector('h1');
    if (h1) content.push(h1);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) content.push(subheading);
    // Button group (all links)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Reference the links directly
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      content.push(...buttons);
    }
    // Add all extracted elements as a single cell (maintain order and structure)
    contentCell = content;
  }

  // --------- BUILD AND REPLACE BLOCK ----------
  const table = WebImporter.DOMUtils.createTable([
    headerRow,                // Row 1: block name
    [backgroundContent],      // Row 2: background images grid
    [contentCell],            // Row 3: heading, subheading, CTAs (can be array)
  ], document);

  element.replaceWith(table);
}
