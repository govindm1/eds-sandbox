function init() {
    console.log('DOM ready');
  
    const block = document.querySelector('.custom-block.block[data-block-name="custom-block"]');
    console.log('Block found:', block);
  
    if (!block) {
      console.warn('Block not found at DOMContentLoaded');
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
   
    init();
  }
  