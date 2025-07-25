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
    if (section) {
      section.classList.add(`footer-${c}`);

      if (c === 'sections') {
        const contentWrapper = section.querySelector('.default-content-wrapper');
        if (contentWrapper) {
          const children = Array.from(contentWrapper.children);
          const newGroups = [];

          for (let i = 0; i < children.length; i++) {
            const el = children[i];
            if (el.tagName.toLowerCase() === 'h5') {
              const nextEl = children[i + 1];
              if (nextEl && ['ul', 'p', 'a'].includes(nextEl.tagName.toLowerCase())) {
                const group = document.createElement('div');
                group.classList.add('footer-link-group');
                group.appendChild(el.cloneNode(true));
                group.appendChild(nextEl.cloneNode(true));
                newGroups.push(group);
                i++; 
              } else {
                const group = document.createElement('div');
                group.classList.add('footer-link-group');
                group.appendChild(el.cloneNode(true));
                newGroups.push(group);
              }
            }
          }

          contentWrapper.textContent = '';
          newGroups.forEach((group) => contentWrapper.appendChild(group));
        }
      }
    }
  });

  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('footer-main');

  const legalWrapper = document.createElement('div');
  legalWrapper.classList.add('footer-legal');

  const mainInner = document.createElement('div');
  mainInner.classList.add('footer-main-inner');

  const legalInner = document.createElement('div');
  legalInner.classList.add('footer-legal-inner');

 
  const brand = footer.querySelector('.footer-brand');
  const linkSection = footer.querySelector('.footer-sections');
  const copyright = footer.querySelector('.footer-copyright');
  const privacy = footer.querySelector('.footer-privacy-policy');

  if (brand) mainInner.appendChild(brand);
  if (linkSection) mainInner.appendChild(linkSection);

  if (copyright) legalInner.appendChild(copyright);
  if (privacy) legalInner.appendChild(privacy);

  if (mainInner.children.length > 0) {
    mainWrapper.appendChild(mainInner);
    footer.appendChild(mainWrapper);
  }

  if (legalInner.children.length > 0) {
    legalWrapper.appendChild(legalInner);
    footer.appendChild(legalWrapper);
  }

  block.append(footer);
}
