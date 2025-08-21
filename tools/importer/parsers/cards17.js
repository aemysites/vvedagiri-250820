/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as required
  const cells = [
    ['Cards (cards17)']
  ];

  // Get all direct child divs that represent cards
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Find the image element in the card
    const img = cardDiv.querySelector('img');
    // There is no text content in the HTML for these cards, so second cell is empty
    cells.push([
      img || '',
      ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
