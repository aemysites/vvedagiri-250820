/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, matches example exactly
  const header = ['Hero (hero39)'];

  // 1st content row: Background Image (optional)
  // Look for the first <img> that serves as background (should be present for hero)
  let bgImg = null;
  // The background image is always present in the DOM for this hero style
  const img = element.querySelector('img');
  if (img) bgImg = img;
  const bgRow = [bgImg];

  // 2nd content row: Text content (Headline, Paragraph, CTA)
  // Gather in block: headline, subheading/paragraph, cta
  const textContent = [];

  // Headline: h1
  const headline = element.querySelector('h1');
  if (headline) textContent.push(headline);

  // Subheading/paragraph: p (large paragraph in hero)
  const paragraph = element.querySelector('p');
  if (paragraph) textContent.push(paragraph);

  // CTA button/link (optional)
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    // Only grab anchor children (ignore wrappers)
    const btn = buttonGroup.querySelector('a');
    if (btn) textContent.push(btn);
  }

  // Always create the cell as an array, even if some items are missing
  const textRow = [textContent];

  // Compose block table rows
  const cells = [
    header,
    bgRow,
    textRow
  ];

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
