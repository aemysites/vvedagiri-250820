/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid block that represents the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid - each child is a column
  const columns = Array.from(grid.children);

  // Compose the header row with exactly one cell, as required by the block structure
  const headerRow = ['Columns (columns9)'];
  // Compose the content row with as many columns as found in the grid
  const contentRow = columns;
  const rows = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
