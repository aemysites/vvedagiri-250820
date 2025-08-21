/* global WebImporter */
export default function parse(element, { document }) {
  // Find the primary grid container with columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid - should be three: left info, contact list, and image
  const children = Array.from(grid.children);
  if (children.length < 3) return; // Defensive: expect three children

  // Compose left column: info block and contact list
  const leftCol = document.createElement('div');
  if (children[0]) leftCol.appendChild(children[0]);
  if (children[1]) leftCol.appendChild(children[1]);

  // Right column: the image
  const rightCol = children[2];

  // Prepare table rows
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftCol, rightCol];
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
