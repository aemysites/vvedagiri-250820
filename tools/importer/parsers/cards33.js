/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly the example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // All cards are direct <a> children of the wrapper div
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Find image (always first img in each card)
    const img = card.querySelector('img');
    // Find the text container: after img, there is a div containing tags, heading, description, CTA, etc.
    // The card itself contains one div (the grid), whose second child is the content div
    let textDiv = null;
    const grid = card.querySelector('.w-layout-grid');
    if (grid) {
      // The grid's children: [img, content div]
      const children = Array.from(grid.children);
      textDiv = children.find(child => child !== img);
    }
    // Fallback, if the above didn't find it
    if (!textDiv) {
      // Find first div as a sibling of img
      textDiv = img && img.nextElementSibling;
    }
    // Defensive: reference, don't clone
    // If no textDiv found, use card itself minus image
    if (!textDiv) {
      // Create a wrapper div with everything except img
      textDiv = document.createElement('div');
      Array.from(card.children).forEach((child) => {
        if (child !== img) textDiv.appendChild(child);
      });
    }
    // Structure: [image, textDiv]
    rows.push([img, textDiv]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
