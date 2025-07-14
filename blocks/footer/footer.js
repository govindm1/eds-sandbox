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

    const footerMain = document.createElement('div');
    footerMain.classList.add('footer-main');

    const footerLegal = document.createElement('div');
    footerLegal.classList.add('footer-legal');

    while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

    const classes = ['brand', 'sections', 'copyright', 'privacy-policy'];
    classes.forEach((c, i) => {
      const section = fragment.children[i];
      if (section) {
        section.classList.add(`footer-${c}`);
  
        // if (c === 'sections') {
        //   const contentWrapper = section.querySelector('.default-content-wrapper');
        //   if (contentWrapper) {
        //     const children = Array.from(contentWrapper.children);
        //     const newGroups = [];
  
        //     for (let i = 0; i < children.length; i++) {
        //       const el = children[i];
        //       if (el.tagName.toLowerCase() === 'h5') {
        //         const nextEl = children[i + 1];
        //         if (nextEl && ['ul', 'p', 'a'].includes(nextEl.tagName.toLowerCase())) {
        //           const group = document.createElement('div');
        //           group.classList.add('footer-link-group');
        //           group.appendChild(el.cloneNode(true));
        //           group.appendChild(nextEl.cloneNode(true));
        //           newGroups.push(group);
        //           i++;
        //         } else {
        //           const group = document.createElement('div');
        //           group.classList.add('footer-link-group');
        //           group.appendChild(el.cloneNode(true));
        //           newGroups.push(group);
        //         }
        //       }
        //     }
  
        //     contentWrapper.textContent = '';

        //     newGroups.forEach((group) => contentWrapper.appendChild(group));
        //   }
        // }
        if (c === 'brand' || c === 'sections') {
          footerMain.appendChild(section);
        } else if (c === 'copyright' || c === 'privacy-policy') {
          footerLegal.appendChild(section);
        }
      }
    });
    block.appendChild(footerMain);
    block.appendChild(footerLegal);
}
