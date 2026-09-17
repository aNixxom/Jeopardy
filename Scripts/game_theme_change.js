import {_dom, _themes} from './game_variables.js';

export function changeTheme(theme) {
  const index = _themes.indexOf(theme);
  if (index < 0) return;
  _dom.current_stylesheet = index;
  document.documentElement.dataset.theme = theme;
  document.getElementById('current-theme').textContent = ` ${theme} `;
  document.getElementById('previous-theme').disabled = index === 0;
  document.getElementById('next-theme').disabled = index === _themes.length - 1;
}
document.getElementById('next-theme').addEventListener('click', () => changeTheme(_themes[_dom.current_stylesheet + 1]));
document.getElementById('previous-theme').addEventListener('click', () => changeTheme(_themes[_dom.current_stylesheet - 1]));
