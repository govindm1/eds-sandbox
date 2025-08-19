import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const img = pic?.querySelector('img');

      if (pic && img) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          console.log('Inside picwrapper');
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
          const imgSrc = img.src;
          const imgAlt = img.alt;
          const imageLink = img.dataset.imageLink;
  
          // Remove existing children to ensure <picture> is the only child
          pic.innerHTML = '';
  
          const optimizedPic = createOptimizedPicture(imgSrc, imgAlt);
          console.log('Image Source:', imgSrc);
          console.log('Alt Text:', imgAlt);
          console.log('Image Link (from JSON):', imageLink);
  
          if (imageLink) {
            const link = document.createElement('a');
            link.href = imageLink;
            link.appendChild(optimizedPic);
            col.appendChild(link);
          } else {
            col.appendChild(optimizedPic);
          }
        }
      }
    });
  });
}
