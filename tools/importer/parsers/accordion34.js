/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion'];
  const cells = [headerRow];

  // Get immediate accordion sections
  const accordionItems = element.querySelectorAll(':scope > .accordion');
  accordionItems.forEach((accordion) => {
    // Title cell: The label visible when collapsed
    let titleCell;
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer .paragraph-lg if present
      const label = toggle.querySelector('.paragraph-lg');
      if (label) {
        titleCell = label; // reference the real element
      } else {
        // Fallback: get all text nodes after icon
        const icon = toggle.querySelector('.w-icon-dropdown-toggle');
        let found = false;
        let textContent = '';
        for (let node of toggle.childNodes) {
          if (node === icon) {
            found = true;
            continue;
          }
          if (found && node.nodeType === 3 && node.textContent.trim()) {
            textContent += node.textContent.trim();
          } else if (found && node.nodeType === 1) {
            textContent += node.textContent;
          }
        }
        titleCell = document.createTextNode(textContent);
      }
    } else {
      titleCell = document.createTextNode(''); // fallback empty
    }

    // Content cell: The panel, all HTML in the dropdown-list
    let contentCell;
    const dropdownList = accordion.querySelector('.w-dropdown-list');
    if (dropdownList) {
      // Reference the .utility-padding-all-1rem if exists, else dropdownList itself
      const contentDiv = dropdownList.querySelector('.utility-padding-all-1rem');
      if (contentDiv) {
        contentCell = contentDiv;
      } else {
        contentCell = dropdownList;
      }
    } else {
      contentCell = document.createTextNode(''); // fallback empty
    }

    cells.push([titleCell, contentCell]);
  });

  // Create and replace with correct table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
