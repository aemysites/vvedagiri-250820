/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row, exactly as specified
  const headerRow = ['Hero (hero12)'];

  // --- Background image row ---
  // Find all images with class 'cover-image' that are NOT inside .card
  let bgImg = null;
  const coverImgs = element.querySelectorAll('img.cover-image');
  for (const img of coverImgs) {
    let parent = img.parentElement;
    let foundCard = false;
    while (parent && parent !== element) {
      if (parent.classList && parent.classList.contains('card')) {
        foundCard = true;
        break;
      }
      parent = parent.parentElement;
    }
    if (!foundCard) {
      bgImg = img;
      break;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- Content row ---
  // Find the .card-body (contains heading, bullets, button)
  let contentCell = null;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  } else {
    // Fallback: get the container that holds text content and CTA
    const textContainer = element.querySelector('.container');
    contentCell = textContainer ? textContainer : '';
  }
  const contentRow = [contentCell];

  // Compose the table
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
