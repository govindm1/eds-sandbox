import { createOptimizedPicture, readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const config = readBlockConfig(block);
  const { fileReference, alt, image_url } = config;

  console.log('Image config:', config);

  const picture = createOptimizedPicture(fileReference, alt, image_url);
  block.innerHTML = '';
  block.append(picture);
}
