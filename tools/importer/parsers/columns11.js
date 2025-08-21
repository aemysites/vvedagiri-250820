/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row: exactly one cell
  const headerRow = ['Columns (columns11)'];

  // --------- LEFT COLUMN ---------
  let leftColumnContent = [];
  const container = element.querySelector('.container');
  const gridLayouts = container ? container.querySelectorAll('.grid-layout') : [];
  const leftGrid = gridLayouts[0];

  if (leftGrid) {
    // First child div: eyebrow, h1
    const headerDiv = leftGrid.children[0];
    if (headerDiv) {
      const eyebrow = headerDiv.querySelector('.eyebrow');
      if (eyebrow) leftColumnContent.push(eyebrow);
      const h1 = headerDiv.querySelector('h1');
      if (h1) leftColumnContent.push(h1);
    }
    // Second child div: paragraph, author block, button
    const contentDiv = leftGrid.children[1];
    if (contentDiv) {
      const paragraph = contentDiv.querySelector('.rich-text');
      if (paragraph) leftColumnContent.push(paragraph);

      // Author block: avatar image, name, meta info
      const authorGrid = contentDiv.querySelector('.w-layout-grid');
      if (authorGrid) {
        const authorRow = authorGrid.querySelector('.flex-horizontal.y-center');
        if (authorRow) leftColumnContent.push(authorRow);
        const button = authorGrid.querySelector('a.button');
        if (button) leftColumnContent.push(button);
      }
    }
  }
  const leftColumn = document.createElement('div');
  leftColumnContent.forEach(el => leftColumn.appendChild(el));

  // --------- RIGHT COLUMN ---------
  const rightGrid = element.querySelector('.mobile-portrait-1-column');
  let rightColumnContent = [];
  if (rightGrid) {
    const imgDivs = rightGrid.querySelectorAll('.utility-aspect-1x1');
    imgDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) rightColumnContent.push(img);
    });
  }
  const rightColumn = document.createElement('div');
  rightColumnContent.forEach(el => rightColumn.appendChild(el));

  // Table second row: two cells (columns)
  const contentRow = [leftColumn, rightColumn];

  // Only the header row is a single cell, the content row is two cells
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
