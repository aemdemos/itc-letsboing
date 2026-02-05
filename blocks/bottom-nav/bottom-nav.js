/*
 * Bottom Navigation Block - LetsBoing
 * Decorates the bottom tab navigation
 */

export default function decorate(block) {
  // Find or create the ul element
  let ul = block.querySelector('ul');

  if (!ul) {
    // Convert block divs to ul/li structure
    ul = document.createElement('ul');
    const rows = [...block.querySelectorAll(':scope > div')];

    rows.forEach((row) => {
      const li = document.createElement('li');
      const link = row.querySelector('a');

      if (link) {
        // Get the icon (picture or img)
        const picture = row.querySelector('picture');
        const img = row.querySelector('img');

        // Get the text content
        const textDiv = row.querySelector('div:last-child');
        const text = textDiv ? textDiv.textContent.trim() : link.textContent.trim();

        // Clear link and rebuild
        link.innerHTML = '';

        // Add icon
        if (picture) {
          link.appendChild(picture);
        } else if (img) {
          link.appendChild(img.cloneNode(true));
        }

        // Add text span
        const span = document.createElement('span');
        span.textContent = text;
        link.appendChild(span);

        li.appendChild(link);
      }

      ul.appendChild(li);
    });

    // Clear block and add ul
    block.innerHTML = '';
    block.appendChild(ul);
  }

  // Mark active nav item based on current page
  const currentPath = window.location.pathname;
  ul.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && (currentPath === href || currentPath.endsWith(href))) {
      link.setAttribute('aria-current', 'page');
      link.closest('li')?.classList.add('active');
    }
  });
}
