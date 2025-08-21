/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirement
  const headerRow = ['Carousel'];

  // Each slide is represented by a '.card-body' (for this example, only one)
  const cardBody = element.querySelector('.card-body');
  let slideRow;
  if (cardBody) {
    // First cell: the image, referenced directly
    const img = cardBody.querySelector('img');
    // Second cell: the heading, if present
    const heading = cardBody.querySelector('.h4-heading');
    let textCell = '';
    if (heading && heading.textContent.trim() !== '') {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      textCell = h2;
    }
    slideRow = [img, textCell];
  } else {
    // Fallback: empty slide row if cardBody missing
    slideRow = ['', ''];
  }

  const cells = [
    headerRow,
    slideRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
