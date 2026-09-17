const menu = document.getElementById('context-menu');
export function showEditMenu(event) {
  menu.style.display = 'block';
  menu.style.left = `${Math.max(0, Math.min(event.clientX, window.innerWidth - menu.offsetWidth))}px`;
  menu.style.top = `${Math.max(0, Math.min(event.clientY, window.innerHeight - menu.offsetHeight))}px`;
  document.getElementById('edit-context-menu').focus();
}
export function hideEditMenu() { menu.style.display = 'none'; }
window.addEventListener('click', event => {
  if (!event.target.closest('.context-menu')) hideEditMenu();
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') hideEditMenu();
});
