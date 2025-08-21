/* global WebImporter */
export default function parse(element, { document }) {
  // The example is a table (no header) with multi-column rows for Q&A.
  // Header for this block
  const headerRow = ['Table (no header)'];
  const rows = [];

  // Find all Q&A pairs: immediate children with class 'divider'
  const dividers = element.querySelectorAll(':scope > .divider');
  for (const divider of dividers) {
    // Each divider contains a .w-layout-grid with question and answer.
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // The two columns: Q (h4-heading), A (rich-text)
      const cells = Array.from(grid.children);
      // Defensive: if less than 2 cells, fallback to grid itself
      if (cells.length === 2) {
        rows.push([cells[0], cells[1]]);
      } else {
        // fallback: keep whatever is present
        rows.push([grid]);
      }
    } else {
      // fallback: use entire divider
      rows.push([divider]);
    }
  }

  // If no dividers found, fallback: treat element as one cell
  if (rows.length === 0) {
    rows.push([element]);
  }

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
