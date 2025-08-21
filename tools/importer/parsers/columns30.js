/* global WebImporter */
export default function parse(element, { document }) {
  // The structure is: section > div.container > div.grid-layout > 4 children (col1, col2, col3, col4)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  // Defensive: But our HTML example only has 4 children, and it's always 3 columns (sometimes more in other layouts)
  // For this block, we want to preserve all text content directly from these blocks.

  // Build header row exactly as required
  const headerRow = ['Columns (columns30)'];

  // Compose each column's DOM content for the row
  // Column 1: Name (Taylor Brooks)
  const col1 = cols[0];

  // Column 2: All tags (Casual Vibes, Sporty Looks, Party Ready) as plain text, space-separated, each its own div.tag
  // To keep all text, we will reference the whole col2 element as-is
  const col2 = cols[1];

  // Column 3: Heading (h2) "Trends made for living bold"
  const col3 = cols[2];

  // Column 4: Rich text (all the paragraphs)
  const col4 = cols[3];

  // Defensive: Only include columns that actually exist
  const rowCells = [];
  if (col1) rowCells.push(col1);
  if (col2) rowCells.push(col2);
  if (col3) rowCells.push(col3);
  if (col4) rowCells.push(col4);

  // The block should have exactly as many columns as the source has
  const cells = [headerRow, rowCells];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
