import { getMetadata } from '../../scripts/aem.js';
import { getSiteRoot } from '../../scripts/scripts.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta).pathname : `${getSiteRoot()}/footer`;
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = footer.children[i];
    iif (section) {
      section.classList.add(`footer-${c}`);

      const h5 = section.querySelector('h5');
      if (h5) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('footer-subsection');

        let sibling = h5;
        while (sibling) {
          const next = sibling.nextElementSibling;
          wrapper.appendChild(sibling);
          sibling = next;
        }

        section.appendChild(wrapper);
      }
    }
  });
  block.append(footer);
}
