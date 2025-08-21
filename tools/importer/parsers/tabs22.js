/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows
  const cells = [];

  // 1. Header row with only 'Tabs' as per spec
  cells.push(['Tabs']);

  // 2. Tab labels and content
  // Get tab labels from the tab menu
  const tabMenu = element.querySelector(':scope > div.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Get tab contents from the tab content container
  const tabContent = element.querySelector(':scope > div.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll(':scope > div.w-tab-pane')) : [];

  // Defensive: handle mismatched/missing data
  if (tabLinks.length === 0 || tabPanes.length === 0) {
    // If missing, don't try to build tabs
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // Build rows for each tab
  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    // 1st cell: label, prefer the inner text of inner div, fallback to anchor text
    let labelElement = tabLinks[i].querySelector('div') ? tabLinks[i].querySelector('div') : tabLinks[i];
    // 2nd cell: content, reference the grid/content div inside the pane, or the pane itself if not found
    let contentDiv = tabPanes[i].querySelector(':scope > div') || tabPanes[i];
    cells.push([labelElement, contentDiv]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
