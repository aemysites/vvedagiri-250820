/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match block name and variant exactly
  const headerRow = ['Cards (cards23)'];
  const rows = [];
  // Find all tab panes inside the given element
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  for (const tabPane of tabPanes) {
    // Find the card/grid container in each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) continue;
    // For each direct child anchor (card) in the grid
    const cards = Array.from(grid.children).filter((child) => child.tagName === 'A');
    for (const card of cards) {
      // --- IMAGE CELL ---
      // First <img> in the card is mandatory
      const imgEl = card.querySelector('img');
      // If no <img>, keep cell empty
      const imageCell = imgEl ? imgEl : '';
      // --- TEXT CELL ---
      // Find heading (h3) and description (first .paragraph-sm)
      const heading = card.querySelector('h3');
      const description = card.querySelector('.paragraph-sm');
      // Compose text cell: heading (if present), then description (if present)
      const textCellContents = [];
      if (heading) textCellContents.push(heading);
      if (description) textCellContents.push(description);
      let textCell;
      if (textCellContents.length === 0) {
        textCell = document.createTextNode('');
      } else if (textCellContents.length === 1) {
        textCell = textCellContents[0];
      } else {
        // Compose all fragments into a <div>
        textCell = document.createElement('div');
        textCellContents.forEach(node => textCell.appendChild(node));
      }
      rows.push([imageCell, textCell]);
    }
  }
  // Compose table: header, then each card row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace original element with block table
  element.replaceWith(table);
}
