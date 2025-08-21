/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block header
  const headerRow = ['Cards (cards24)'];
  // Each card is a top-level <a>
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [headerRow];

  cards.forEach(card => {
    // Image cell: find first <img> inside the .utility-aspect-2x3 container
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    let imageEl = null;
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }

    // Text cell: build an array of present elements, preserving order/structure
    const cellContent = [];
    // Get the meta info (tag + date): as a div, preserving both children
    const meta = card.querySelector('.flex-horizontal');
    if (meta) cellContent.push(meta);
    // Get the heading (h3)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) cellContent.push(heading);

    // Only include non-empty cells
    rows.push([
      imageEl || '',
      cellContent.length === 1 ? cellContent[0] : (cellContent.length > 1 ? cellContent : '')
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
