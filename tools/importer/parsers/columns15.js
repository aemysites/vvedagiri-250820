/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid, which are columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length === 0) return;

  // For each column, reference its full content in a div to ensure all text/content is preserved
  // If the column is just an <img>, use it directly; else, wrap content in a div
  const columnCells = gridChildren.map(col => {
    // If it's just an img, use the image directly
    if (col.tagName === 'IMG') {
      return col;
    }
    // Otherwise, wrap all nodes in a div for structure
    const wrapper = document.createElement('div');
    while (col.childNodes.length) {
      wrapper.appendChild(col.childNodes[0]);
    }
    return wrapper;
  });

  // Compose the block table cells
  const headerRow = ['Columns (columns15)']; // EXACT header as required
  const dataRow = columnCells;

  // Create table and replace original element
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, dataRow], document);
  element.replaceWith(blockTable);
}
