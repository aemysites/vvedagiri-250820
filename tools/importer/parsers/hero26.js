/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Hero (hero26)'];

  // 2nd row: background image. This HTML does not have a background image for the hero, so leave empty string
  const bgRow = [''];

  // 3rd row: Title, Subheading, Call-to-action, AND testimonial block from this layout
  // Find the main grid wrapper in .container
  const container = element.querySelector('.container');
  if (!container) {
    // fallback: just replace with empty hero block
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      bgRow,
      ['']
    ], document);
    element.replaceWith(table);
    return;
  }

  // The grid with all main hero content
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      bgRow,
      ['']
    ], document);
    element.replaceWith(table);
    return;
  }

  // Get all top-level children from hero grid
  const gridChildren = Array.from(mainGrid.children);

  // Find heading
  const heading = gridChildren.find(e => e.classList.contains('h2-heading'));
  // Find subheading
  const subheading = gridChildren.find(e => e.classList.contains('paragraph-lg'));
  // Find the inner testimonial grid (which contains image, attribution, svg logo)
  const testimonial = gridChildren.find(e => e.classList.contains('w-layout-grid') && e !== mainGrid);

  // Compose cell content array, only referencing existing elements (no clones)
  const cellContent = [];
  if (heading) cellContent.push(heading);
  if (subheading) cellContent.push(subheading);
  if (testimonial) cellContent.push(testimonial);

  // If nothing found just use empty string
  const contentRow = [cellContent.length > 0 ? cellContent : ['']];

  // Build table
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
