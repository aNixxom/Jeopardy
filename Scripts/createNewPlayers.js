import {_dom} from './game_variables.js';
import {closeMenu} from './game_settings.js';
import {systemMessage} from './ui.js';

export function renderPlayers() {
  const names = document.getElementById('player_names');
  const scores = document.getElementById('player_score_text');
  const controls = document.getElementById('player_score_buttons');
  names.replaceChildren();
  scores.replaceChildren();
  controls.replaceChildren();
  _dom.players.forEach((player, index) => {
    const number = index + 1;
    const name = document.createElement('th');
    name.id = `player${number}_name`;
    name.scope = 'col';
    name.className = 'headers';
    const nameButton = document.createElement('button');
    nameButton.className = 'player-name';
    nameButton.textContent = player.name;
    nameButton.disabled = !_dom.editModeToggled;
    nameButton.dataset.player = index;
    nameButton.setAttribute('aria-label', `Rename ${player.name}`);
    name.append(nameButton);
    names.append(name);
    const score = document.createElement('td');
    score.id = `player${number}_score`;
    score.className = 'score_boxes';
    score.textContent = player.score;
    score.setAttribute('aria-live', 'polite');
    scores.append(score);
    const buttons = document.createElement('td');
    buttons.id = `player${number}_buttons`;
    for (const action of ['add', 'take']) {
      const button = document.createElement('button');
      button.id = `${action}_p${number}`;
      button.className = 'points-button';
      button.textContent = action.toUpperCase();
      button.setAttribute('aria-label', `${action === 'add' ? 'Add points to' : 'Take points from'} ${player.name}`);
      buttons.append(button);
    }
    controls.append(buttons);
  });
  document.getElementById('player_count').textContent = ` ${_dom.players.length} `;
}

document.getElementById('add_player').addEventListener('click', () => {
  if (_dom.players.length >= 5) return systemMessage('You can’t have more than 5 players.');
  const entered = prompt('Enter a player name (up to 10 characters)');
  if (entered === null) return;
  const name = entered.trim();
  if (!name || name.length > 10) return systemMessage('Enter a name between 1 and 10 characters.');
  _dom.players.push({name, score: 0});
  renderPlayers();
  closeMenu();
});

document.getElementById('take_player').addEventListener('click', () => {
  if (_dom.players.length <= 3) return systemMessage('You can’t have fewer than 3 players.');
  const player = _dom.players.at(-1);
  if (!confirm(`Remove ${player.name} and their score?`)) return;
  _dom.players.pop();
  renderPlayers();
  closeMenu();
  systemMessage(`Removed ${player.name}.`);
});
