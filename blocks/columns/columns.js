import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
    
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          console.log('Inside picwrapper');
          
          picWrapper.classList.add('columns-img-col');
          const img = pic.querySelector('img');
          const imgSrc = img?.src;
          const imgAlt = img?.alt || '';
          const imageLink = pic.getAttribute('imagelink');
    
          console.log('Image Source:', imgSrc);
          console.log('Alt Text:', imgAlt);
          console.log('Image Link:', imageLink);
    
          //pic.innerHTML = ''; 
    
          const optimizedPic = createOptimizedPicture(imgSrc, imgAlt, imageLink);
    
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
