/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: exactly one cell with the block name
  const headerRow = ['Columns (columns38)'];

  // 2. Columns: all direct child divs become the second row, each as a cell
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = columnDivs;

  // 3. Build the cells array: header is a single-cell row, followed by one row with N columns
  const cells = [
    headerRow,
    contentRow
  ];

  // 4. Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}