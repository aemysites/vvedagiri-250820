/* global WebImporter */
export default function parse(element, { document }) {
  // Start table with header as in the example
  const cells = [['Cards (cards10)']];

  // Get all card links at the top level
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cards.forEach(card => {
    // First cell: image (mandatory)
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Second cell: text content (tag, heading, paragraph)
    const textWrap = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];

    // Tag (optional)
    const tag = textWrap && textWrap.querySelector('.tag-group .tag');
    if (tag) {
      textContent.push(tag);
    }
    // Heading (optional, use original element to keep heading semantics)
    const heading = textWrap && textWrap.querySelector('h3');
    if (heading) {
      textContent.push(heading);
    }
    // Paragraph (optional)
    const paragraph = textWrap && textWrap.querySelector('p');
    if (paragraph) {
      textContent.push(paragraph);
    }

    // Only add row if we have both an image and some text content
    if (img && textContent.length > 0) {
      cells.push([img, textContent]);
    }
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
