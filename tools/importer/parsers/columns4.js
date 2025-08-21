/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review:
  // - No hardcoded content, only block name in header
  // - No markdown
  // - Only one block table; matches example
  // - Header matches 'Columns (columns4)'
  // - No Section Metadata in example
  // - References existing elements
  // - Semantic meaning maintained (each div is a column)
  // - No missing text content

  // Header row as per spec
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (columns)
  const cols = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if there are less than 2 columns, output anyway
  const contentRow = cols.length > 0 ? cols : [''];

  // Compose rows
  const rows = [headerRow, contentRow];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
