async function renderPosts(block) {
    console.log("Inside Custom Block");
    try {
      const res = await fetch('https://dev.to/api/articles');
      const data = await res.json();

      const gridContainer = document.createElement('div');
      gridContainer.classList.add('post-card-grid');

      data.slice(0, 4).forEach(post => {
        const postLink = document.createElement('a');
        postLink.classList.add('post-link');
        postLink.href = post.url;
        postLink.target = '_blank';
        postLink.rel = 'noopener noreferrer';

        const card = document.createElement('div');
        card.classList.add('post-card');

        const title = document.createElement('h3');
        title.classList.add('post-card-title');
        title.textContent = post.title;

        card.appendChild(title);
        postLink.appendChild(card);
        gridContainer.appendChild(postLink);
      });

      block.appendChild(gridContainer);
    } catch (err) {
      console.error('Failed to load posts:', err);
      block.innerHTML = '<p>Error loading posts.</p>';
    }
  }

  function waitForBlock(selector, callback) {
    const existing = document.querySelector(selector);
    if (existing) {
      console.log("Block found immediately.");
      callback(existing);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const block = document.querySelector(selector);
      if (block) {
        console.log("Block found via MutationObserver.");
        obs.disconnect();
        callback(block);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  console.log('Script is loaded');

  function init() {
    console.log('DOM ready');
    waitForBlock('.custom-block.block[data-block-name="custom-block"]', renderPosts);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }