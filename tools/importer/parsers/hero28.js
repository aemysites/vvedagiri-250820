/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Hero (hero28)'];

  // Get immediate children of the grid layout
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = null;
  let contentCell = [];

  if (grid) {
    const children = grid.querySelectorAll(':scope > div');
    // For each child: if it has an img, that's the background; if it has heading/content, that's the text
    children.forEach((div) => {
      if (!bgImg) {
        const img = div.querySelector('img');
        if (img) {
          bgImg = img;
        }
      }
      if (contentCell.length === 0) {
        // Find the div which contains the main heading
        const heading = div.querySelector('h1');
        if (heading) {
          // We'll include the heading and any buttons/ctas under it
          const container = document.createElement('div');
          // Get the element that has the heading and possibly CTA/buttons
          const headingContainer = div.querySelector('.utility-margin-bottom-6rem');
          if (headingContainer) {
            // Add all children of this container
            Array.from(headingContainer.childNodes).forEach((node) => {
              // Only append nodes with actual content
              if (
                (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim() !== '') ||
                (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
              ) {
                container.appendChild(node);
              }
            });
          }
          // If container has something, use it
          if (container.childNodes.length > 0) {
            contentCell.push(container);
          }
        }
      }
    });
  }

  // Second row: background image (if present)
  const bgImgRow = [bgImg ? bgImg : ''];
  // Third row: content (if present)
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
