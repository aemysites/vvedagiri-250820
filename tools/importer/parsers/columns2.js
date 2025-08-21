/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // First column: left main block
  const leftCol = gridChildren[0];

  // Second column: composite of all image cards and text link cards
  const imageCards = Array.from(gridChildren[1].querySelectorAll('a.utility-link-content-block'));
  const textCards = Array.from(gridChildren[2].querySelectorAll('a.utility-link-content-block'));
  const rightColContent = [...imageCards, ...textCards];

  // Compose table rows: only 2 columns
  const headerRow = ['Columns (columns2)'];
  const columnsRow = [leftCol, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
