/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Get the columns block grid
  const grid = element.querySelector('.container > .w-layout-grid');
  if (!grid) return;

  // Step 2: Identify immediate children of the grid (should be content & image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The left column is the content block (text, headings, button)
  const contentCol = columns[0];
  // The right column is the image
  const imageCol = columns[1];

  // Edge case: Ensure both columns have content
  if (!contentCol || !imageCol) return;

  // Step 3: Table header matches example exactly
  const headerRow = ['Columns (columns27)'];
  // Step 4: Compose the row with both columns referenced directly
  const columnsRow = [contentCol, imageCol];
  const rows = [headerRow, columnsRow];

  // Step 5: Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Step 6: Replace the original element with the new block
  element.replaceWith(block);
}
