import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const img = pic?.querySelector('img');

      if (pic && img) {
        const imageLink = img.dataset.imageLink || '';
        const optimizedPic = createOptimizedPicture(imageLink, img.src, img.alt);
        pic.replaceWith(optimizedPic); 
      }

      if (pic && col.children.length === 1) {
        col.classList.add('columns-img-col');
      }
    });
  });
}
