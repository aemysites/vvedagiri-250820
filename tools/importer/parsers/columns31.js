/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single column (not matching the number of grid columns)
  const headerRow = ['Columns (columns31)'];

  // Find the grid container (should have all columns as immediate children)
  const grid = element.querySelector('.grid-layout');

  let columns = [];
  if (grid) {
    // Get all immediate children (the columns)
    const colDivs = grid.querySelectorAll(':scope > div');
    // Use the full div per column as the table cell
    columns = Array.from(colDivs);
  }

  // Construct the table: single header cell row, then the multi-column content row
  const tableCells = [headerRow];
  if (columns.length > 0) {
    tableCells.push(columns);
  }

  // Replace the element only if we have columns/content
  if (tableCells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(tableCells, document);
    // The WebImporter function will by default create a header row of only one column (th colspan)
    element.replaceWith(table);
  }
}
