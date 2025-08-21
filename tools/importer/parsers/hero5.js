/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: must EXACTLY match example
  const headerRow = ['Hero (hero5)'];

  // Get all immediate children of the top-level grid
  const outerGrid = element.querySelector('.grid-layout');
  let imageEl = null;
  let contentEl = null;

  if (outerGrid) {
    // Look for image among immediate children of the grid
    const children = outerGrid.querySelectorAll(':scope > *');
    for (const child of children) {
      // Use first <img> as the block image
      if (!imageEl && child.tagName === 'IMG') {
        imageEl = child;
      }
      // Use the first content block (likely the text/cta)
      if (!contentEl && child.classList.contains('container')) {
        // Within container, look for the direct section child
        const section = child.querySelector('.section');
        if (section) {
          contentEl = section;
        }
      }
    }
    // Fallback: if contentEl not found, look for section anywhere
    if (!contentEl) {
      contentEl = outerGrid.querySelector('.section');
    }
  }

  // Fallbacks if not found above
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  if (!contentEl) {
    contentEl = element.querySelector('.section');
  }

  // Structure: 1 column, 3 rows
  // Row 1: header; Row 2: image (optional); Row 3: text content (heading + paragraph + CTAs)
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentEl ? contentEl : '']
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with new table
  element.replaceWith(table);
}
