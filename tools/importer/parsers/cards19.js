/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header for the block table
  const cells = [['Cards (cards19)']];

  // Get all direct card nodes (each card is a flex-horizontal direct child div)
  const cardNodes = element.querySelectorAll(':scope > div');

  cardNodes.forEach(card => {
    // First cell: Icon (the .icon div)
    const iconDiv = card.querySelector(':scope > div .icon'); // .icon is always present, but gracefully handle missing
    // Second cell: Text paragraph
    const textP = card.querySelector('p');
    
    // Defensive: if missing, add empty cell
    cells.push([
      iconDiv || document.createElement('div'),
      textP   || document.createElement('div')
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
