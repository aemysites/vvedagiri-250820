/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards25)'];

  // Find all child divs that contain an image (a card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  const cardRows = cardDivs.map(cardDiv => {
    // First cell: the image (always present)
    const img = cardDiv.querySelector('img');
    // Second cell: text content (may be missing if no h3/p)
    let textElements = [];
    // Preferentially find the wrapper for h3 and p
    const textWrappers = Array.from(cardDiv.querySelectorAll('h3, p')).map(el => el.parentElement);
    // Use the deepest wrapper that has both h3 and p if possible
    let textContainer = null;
    if (textWrappers.length > 0) {
      textContainer = textWrappers[0];
      // If next wrapper is not identical, and has more content, use it
      if (textWrappers.length > 1 && textWrappers[1].children.length > textWrappers[0].children.length) {
        textContainer = textWrappers[1];
      }
    }
    // If textContainer found and contains h3 or p, push those in order
    if (textContainer) {
      const h3 = textContainer.querySelector('h3');
      const p = textContainer.querySelector('p');
      if (h3) textElements.push(h3);
      if (p) textElements.push(p);
    }
    // If nothing found, leave cell empty
    if (textElements.length === 0) textElements = [''];
    return [img, textElements];
  });

  // Compose the table
  const tableData = [headerRow, ...cardRows];
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
