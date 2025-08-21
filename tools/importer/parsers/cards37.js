/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first <img> in a card
  function extractImage(card) {
    let img = card.querySelector('img');
    if (img) return img;
    // sometimes image is nested further (within divs)
    const divs = card.querySelectorAll('div');
    for (const div of divs) {
      img = div.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract the text block from a card
  function extractText(card) {
    const frag = document.createDocumentFragment();
    // Title: h2, h3, or h4 within the card
    const heading = card.querySelector('h2, h3, h4');
    if (heading) frag.appendChild(heading);
    // Description: first <p>
    const desc = card.querySelector('p');
    if (desc) frag.appendChild(desc);
    // CTA: button or .button (can be a div styled as .button)
    const cta = card.querySelector('button, .button, a.button');
    if (cta) frag.appendChild(cta);
    return frag;
  }

  // Find the main card grid
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    // The first .grid-layout inside container is the main card grid
    grid = container.querySelector(':scope > .grid-layout');
  } else {
    // fallback: find .grid-layout directly under element
    grid = element.querySelector(':scope > .grid-layout');
  }
  if (!grid) return;

  // There might be nested .grid-layouts, so collect all direct card links from all first-level children
  let cardNodes = [];
  // Get all direct children (a cards or .grid-layout that may contain more a cards)
  for (const node of grid.children) {
    if (node.tagName === 'A') {
      cardNodes.push(node);
    } else if (node.classList.contains('grid-layout')) {
      // add all <a> children of this nested grid
      cardNodes = cardNodes.concat(Array.from(node.querySelectorAll(':scope > a')));
    }
  }

  // Build rows
  const rows = [['Cards (cards37)']];
  for (const card of cardNodes) {
    const img = extractImage(card);
    const text = extractText(card);
    if (img && text) {
      rows.push([img, text]);
    }
  }

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
