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

    const classes = ['brand', 'sections', 'copyright', 'privacy-policy'];
    classes.forEach((c, i) => {
        const section = footer.children[i];
        // if (section) section.classList.add(`footer-${c}`);
        if (section) {
          section.classList.add(`footer-${c}`);
          const h5 = section.querySelector('h5');
          if (h5 && h5.nextElementSibling) {
            const sibling = h5.nextElementSibling;
            const wrapper = document.createElement('div');
            wrapper.classList.add('footer-subgroup');    
            wrapper.appendChild(h5);
            wrapper.appendChild(sibling);    
            section.insertBefore(wrapper, sibling.nextElementSibling);
          }
        }
    });
    block.append(footer);
}
