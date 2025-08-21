/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Columns (columns3)'];
  // Find the grid container holding the columns
  const grid = element.querySelector('.grid-layout');
  let columnElements = [];
  if (grid) {
    // Only immediate children of the grid are columns
    columnElements = Array.from(grid.children);
  } else {
    // Fallback, treat immediate children of element as columns
    columnElements = Array.from(element.children);
  }
  // Prepare the content row: each cell is a reference to the whole column element
  const contentRow = columnElements.map((col) => col);
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
