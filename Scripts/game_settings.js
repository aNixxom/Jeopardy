import {_dom} from './game_variables.js';
import {updateBoardValues} from './game_main.js';
import {systemMessage} from './ui.js';

export function closeMenu() {
  _dom.main.hidden = false;
  _dom.settings_menu.style.display = 'none';
  _dom.menu_button.setAttribute('aria-expanded', 'false');
  _dom.isOpen = false;
}

_dom.menu_button.addEventListener('click', () => {
  if (_dom.viewingQuestion) return;
  if (_dom.isOpen) return closeMenu();
  _dom.main.hidden = true;
  _dom.settings_menu.style.display = 'flex';
  _dom.menu_button.setAttribute('aria-expanded', 'true');
  _dom.isOpen = true;
});

export function applySettings() {
  for (const audio of [_dom.countdown_music, _dom.times_up, _dom.correct_answer_sound]) audio.muted = _dom.is_muted;
  _dom.mute_button.style.display = _dom.is_muted ? 'none' : 'block';
  _dom.unmute_button.style.display = _dom.is_muted ? 'block' : 'none';
  _dom.editModeSwitch.setAttribute('aria-pressed', String(_dom.editModeToggled));
  _dom.editModeSwitch.textContent = _dom.editModeToggled ? 'On' : 'Off';
  _dom.doublePointsSwitch.setAttribute('aria-pressed', String(_dom.doublePointToggled));
  _dom.doublePointsSwitch.textContent = _dom.doublePointToggled ? 'On' : 'Off';
  _dom.edit_mode_icon.style.display = _dom.editModeToggled ? 'block' : 'none';
  _dom.double_points_icon.style.display = _dom.doublePointToggled ? 'block' : 'none';
  document.querySelectorAll('.player-name').forEach(button => { button.disabled = !_dom.editModeToggled; });
  _dom.question_length_text.textContent = ` ${_dom.questionLength / 1000}s `;
  _dom.question_length_icon.textContent = `${_dom.questionLength / 1000}s`;
  updateBoardValues();
}

function changeAudio() {
  _dom.is_muted = !_dom.is_muted;
  applySettings();
  systemMessage(_dom.is_muted ? 'Muted game audio.' : 'Unmuted game audio.');
}
_dom.mute_button.addEventListener('click', changeAudio);
_dom.unmute_button.addEventListener('click', changeAudio);
for (const [button, property] of [[_dom.editModeSwitch, 'editModeToggled'], [_dom.doublePointsSwitch, 'doublePointToggled'], [_dom.edit_mode_icon, 'editModeToggled'], [_dom.double_points_icon, 'doublePointToggled']]) {
  button.addEventListener('click', () => {
    if (_dom.viewingQuestion) return;
    _dom[property] = !_dom[property];
    applySettings();
  });
}
for (const [id, change] of [['take_seconds', -1000], ['add_seconds', 1000]]) {
  document.getElementById(id).addEventListener('click', () => {
    const next = _dom.questionLength + change;
    if (next < 4000 || next > 60000) return systemMessage('Question length must be between 4 and 60 seconds.');
    _dom.questionLength = next;
    applySettings();
  });
}
