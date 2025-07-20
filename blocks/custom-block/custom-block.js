async function renderPosts(block) {
    try {
      const res = await fetch('https://dev.to/api/articles');
      const data = await res.json();

      const gridContainer = document.createElement('div');
      gridContainer.classList.add('post-card-grid');

      data.slice(0, 4).forEach(post => {
        const postLink = document.createElement('a');
        postLink.classList.add('post-link');
        postLink.href = post.url;

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

  document.addEventListener('DOMContentLoaded', () => {
    let block = document.getElementById('posts-block');
      if (!block) {
        block = document.createElement('div');
        block.id = 'posts-block';
        document.body.appendChild(block);
      }
      renderPosts(block);
  });