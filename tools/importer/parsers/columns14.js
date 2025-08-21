/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns from the grid (should be two)
  const columns = Array.from(grid.children);

  // Header row: a single cell matching the block name exactly
  const headerRow = ['Columns (columns14)'];

  // Only proceed if there is at least one column
  if (columns.length === 0) return;

  // Compose the table: header row (1 cell), then one row with one cell for each column
  // This produces a table: [[header], [col1, col2, ...]]
  const cells = [
    headerRow,
    columns
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
