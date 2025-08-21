/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get immediate column containers
  const columns = Array.from(grid.children);
  // For each column, find the image (reference the img, not parent wrappers)
  const images = columns.map(col => {
    const img = col.querySelector('img');
    // Fallback to empty string if not found
    return img || '';
  });
  // Table header must match spec: single cell header
  const cells = [
    ['Columns (columns16)'], // header row, single cell
    images // content row, each image in its own cell (column)
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan on header cell to span all columns
  const headerRow = table.querySelector('tr');
  if (headerRow && headerRow.children.length === 1 && images.length > 1) {
    headerRow.children[0].setAttribute('colspan', images.length);
  }
  element.replaceWith(table);
}
