import { createOptimizedPicture, readBlockConfig } from '../../scripts/aem.js';
export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
        const config = readBlockConfig(block);
        const { fileReference, alt, image_url } = config;
      
        console.log('Image config:', config);
      
        const picture = createOptimizedPicture(fileReference, alt, image_url);
        block.innerHTML = '';
        block.append(picture);
      }
    });
  });
}
