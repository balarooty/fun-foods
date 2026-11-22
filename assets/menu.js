const categoryList = document.querySelector('.category-links');
const categoryPicker = document.querySelector('.category-picker');
const categoryLinks = document.querySelectorAll('.menu-nav a');

function highlightCategory() {
  for (const link of categoryLinks) {
    if (link.hash === location.hash) {
      link.setAttribute('aria-current', 'location');
      const lane = categoryList.getBoundingClientRect();
      const chip = link.getBoundingClientRect();
      if (categoryList.contains(link) && (chip.left < lane.left || chip.right > lane.right)) {
        categoryList.scrollLeft += chip.left - lane.left - 5;
      }
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

categoryPicker.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  categoryPicker.open = false;
  const category = document.getElementById(link.hash.slice(1));
  requestAnimationFrame(() => {
    category.querySelector('h2').focus({ preventScroll: true });
  });
});

categoryPicker.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !categoryPicker.open) return;

  categoryPicker.open = false;
  categoryPicker.querySelector('summary').focus();
});

window.addEventListener('hashchange', highlightCategory);
highlightCategory();
