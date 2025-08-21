/* global WebImporter */
export default function parse(element, { document }) {
  // Identify the block name for the header
  const headerRow = ['Columns (columns32)'];

  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of grid (should be the columns)
  const columns = Array.from(grid.children);

  // For the provided HTML, there are two columns:
  // Column 0: The <img> element
  // Column 1: The content div (text, heading, author info, tags, etc)

  // Extract the image (first column)
  const imgEl = columns.find((el) => el.tagName === 'IMG');

  // Extract the content (second column)
  const contentEl = columns.find((el) => el !== imgEl);

  // For robustness, if more columns are present, reference each as is
  const dataRow = columns.map(el => el);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
