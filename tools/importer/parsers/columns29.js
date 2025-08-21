/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, as in the example
  const headerRow = ['Columns (columns29)'];

  // Find all immediate child divs for columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive check: If no columns, do not proceed
  if (!columnDivs.length) return;

  // For each column, extract its visible content (here: image)
  const contentRow = columnDivs.map(div => {
    // Use the first img element in each column
    const img = div.querySelector('img');
    return img ? img : '';
  });

  // Compose cells: header row as one cell, then content row with one cell per column
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
