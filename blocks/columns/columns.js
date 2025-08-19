import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const img = pic?.querySelector('img');

      if (pic && img) {
        const imgSrc = img.src;
        const imgAlt = img.alt;
        const imageLink = img.dataset.imageLink?.trim();

        const optimizedPic = createOptimizedPicture(imgSrc, imgAlt);
        console.log('Image Source:', imgSrc);
        console.log('Alt Text:', imgAlt);
        console.log('Image Link (from JSON):', imageLink);
        // Wrap image in anchor tag if imageLink exists
        if (imageLink) {
          const link = document.createElement('a');
          link.href = imageLink;
          link.appendChild(optimizedPic);
          pic.replaceWith(link);
        } else {
          pic.replaceWith(optimizedPic);
        }
      }

      if (pic && col.children.length === 1) {
        col.classList.add('columns-img-col');
      }
    });
  });
}
