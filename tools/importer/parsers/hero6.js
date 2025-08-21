/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: exact block name per spec
  const headerRow = ['Hero (hero6)'];

  // --- Background image row ---
  // Find the first image with 'cover-image' class (background)
  let bgImg = element.querySelector('img.cover-image');
  const backgroundRow = [bgImg || ''];

  // --- Content row ---
  // Find the card with heading, subheading, buttons
  let contentCard = element.querySelector('.card');
  const contentRow = [contentCard || ''];

  // Compose table rows
  const rows = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
