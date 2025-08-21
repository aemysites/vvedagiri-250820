/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example block name
  const headerRow = ['Hero (hero35)'];
  // No Section Metadata block in example, so none needed

  // Row 2: background image -- not present in provided HTML
  const bgImageRow = [''];

  // Row 3: headline, subheading, CTA (single cell)
  // Extract text and button from grid
  const grid = element.querySelector('.w-layout-grid');
  let contentCellParts = [];
  if (grid) {
    // Find heading and subheading
    // The layout is: [div with heading/subheading, a.button]
    const divs = Array.from(grid.children);
    const contentDiv = divs.find(div => div.querySelector('h1, h2, h3, h4, h5, h6'));
    if (contentDiv) {
      // Append all children (handle empty)
      Array.from(contentDiv.children).forEach((node) => {
        contentCellParts.push(node);
      });
    }
    // Find CTA anchor (button)
    const cta = divs.find(div => div.tagName === 'A');
    if (cta) {
      contentCellParts.push(cta);
    }
  } else {
    // Fallback: use all of element's children
    contentCellParts = Array.from(element.children);
  }

  // If nothing found, ensure cell isn't empty
  if (contentCellParts.length === 0) {
    contentCellParts = [''];
  }

  const cells = [
    headerRow,
    bgImageRow,
    [contentCellParts]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
