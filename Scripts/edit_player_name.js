import {_dom} from './game_variables.js';
import {renderPlayers} from './createNewPlayers.js';
import {hideEditMenu, showEditMenu} from './custom_context_menu.js';
import {systemMessage} from './ui.js';

let selectedPlayer = null;
const editor = document.getElementById('name-editor');
const input = document.getElementById('name-input');
function editName() {
  if (selectedPlayer === null || !_dom.players[selectedPlayer]) return;
  hideEditMenu();
  input.value = _dom.players[selectedPlayer].name;
  editor.showModal();
  input.focus();
  input.select();
}
document.getElementById('player_names').addEventListener('click', event => {
  const button = event.target.closest('.player-name');
  if (!_dom.editModeToggled || !button) return;
  selectedPlayer = Number(button.dataset.player);
  editName();
});
document.getElementById('player_names').addEventListener('contextmenu', event => {
  const button = event.target.closest('.player-name');
  if (!_dom.editModeToggled || !button) return;
  event.preventDefault();
  selectedPlayer = Number(button.dataset.player);
  showEditMenu(event);
});
document.getElementById('edit-context-menu').addEventListener('click', editName);
document.getElementById('cancel-context-menu').addEventListener('click', hideEditMenu);
document.getElementById('reset-player-name').addEventListener('click', () => {
  if (selectedPlayer === null || !_dom.players[selectedPlayer]) return;
  _dom.players[selectedPlayer].name = `Player ${selectedPlayer + 1}`;
  renderPlayers();
  hideEditMenu();
});
document.getElementById('name-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = input.value.trim();
  if (!name || name.length > 10) {
    input.setCustomValidity('Enter a name between 1 and 10 characters.');
    input.reportValidity();
    return;
  }
  if (selectedPlayer === null || !_dom.players[selectedPlayer]) return;
  _dom.players[selectedPlayer].name = name;
  editor.close();
  renderPlayers();
  systemMessage('Player name updated.');
});
input.addEventListener('input', () => input.setCustomValidity(''));
document.getElementById('cancel-name').addEventListener('click', () => editor.close());
