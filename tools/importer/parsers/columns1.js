/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The header row must be a single cell with the block name, regardless of columns
  const headerRow = ['Columns (columns1)'];
  // The content row contains as many columns as needed (from the grid)
  const contentRow = columns;

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // first row: one cell
    contentRow // second row: one cell per column
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
