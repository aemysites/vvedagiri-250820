/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main grid layout that contains two columns (text and images)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // ====== LEFT COLUMN: Textual Content =======
  // This should include the h1, subheading, and buttons (all from the left column)
  const leftCol = columns[0];

  // ====== RIGHT COLUMN: Images =======
  // Find the grid inside the right column (which contains only images)
  let rightCol = columns[1];
  let imagesGrid = rightCol.querySelector('.grid-layout');
  if (!imagesGrid) imagesGrid = rightCol;

  // The block name header, as per spec/example
  const headerRow = ['Columns (columns36)'];

  // The second row is two columns: leftCol and imagesGrid
  const cells = [
    headerRow,
    [leftCol, imagesGrid]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
