/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block - header row must match example exactly
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Find the main image for the card (mandatory)
    const img = cardDiv.querySelector('img');

    // For text cell: collect all content that is not the image itself
    // If there is no extra content, use the image alt as fallback for text
    let textCellContent = [];
    // Remove all img elements in a clone, get the HTML/text that remains
    const clone = cardDiv.cloneNode(true);
    clone.querySelectorAll('img').forEach(i => i.remove());
    // Pull all direct children and text from clone
    // If the clone has any child nodes left (text or elements), use them
    // Otherwise, fallback to alt text if present
    let hasNonEmpty = false;
    Array.from(clone.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Only add element if it has visible content
        if (node.textContent && node.textContent.trim().length > 0) {
          textCellContent.push(node);
          hasNonEmpty = true;
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        // Add non-empty text nodes
        if (node.textContent && node.textContent.trim().length > 0) {
          // Wrap in span for structure
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          textCellContent.push(span);
          hasNonEmpty = true;
        }
      }
    });
    if (!hasNonEmpty && img && img.alt && img.alt.trim().length > 0) {
      // Use the <img> alt text as a fallback
      const span = document.createElement('span');
      span.textContent = img.alt.trim();
      textCellContent.push(span);
    }
    // Only include the row if there is an image
    if (img) {
      rows.push([img, textCellContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
