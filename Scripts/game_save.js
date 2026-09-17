import {_dom, _themes} from './game_variables.js';
import {closeMenu, applySettings} from './game_settings.js';
import {renderPlayers} from './createNewPlayers.js';
import {closeQuestion, updateBoardValues} from './game_main.js';
import {changeTheme} from './game_theme_change.js';
import {loadBoard} from './api.js';
import {systemMessage} from './ui.js';

export const SAVE_KEY = 'jeopardy.save.v2';
const legacyKeys = ['questionLength', 'theme', 'currentStyleSheet', 'editModeToggled', 'doublePointToggled', 'audioMuted',
  ...Array.from({length: 7}, (_, i) => [`player${i + 1}_name`, `player${i + 1}_score`]).flat(),
  ...Array.from({length: 5}, (_, row) => Array.from({length: 5}, (_, col) => `r${row}c${col}`)).flat()];
const isText = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 2000;

function validSettings(save) {
  return save?.version === 2 && Array.isArray(save.players) && save.players.length >= 3 && save.players.length <= 5 &&
    save.players.every(player => isText(player.name) && player.name.length <= 10 && Number.isSafeInteger(player.score)) &&
    Number.isInteger(save.questionLength) && save.questionLength >= 4000 && save.questionLength <= 60000 &&
    _themes.includes(save.theme) && ['muted', 'editMode', 'doublePoints'].every(key => typeof save[key] === 'boolean') &&
    [200, 400, 600, 800, 1000].includes(save.selectedBaseValue);
}

function validSave(save) {
  return validSettings(save) && Array.isArray(save.board) && save.board.length === 5 && save.board.every(column =>
      isText(column.category) && Array.isArray(column.questions) && column.questions.length === 5 && column.questions.every(clue =>
        isText(clue.question) && Array.isArray(clue.answers) && clue.answers.length === 4 && clue.answers.every(isText) &&
        new Set(clue.answers).size === 4 && Number.isInteger(clue.correctIndex) && clue.correctIndex >= 0 && clue.correctIndex < 4 &&
        typeof clue.used === 'boolean'));
}

export function saveGame() {
  if (!_dom.boardReady || _dom.viewingQuestion) return systemMessage('Wait for the board to finish loading before saving.');
  const save = {
    version: 2, players: _dom.players, board: _dom.board,
    questionLength: _dom.questionLength, theme: _themes[_dom.current_stylesheet],
    muted: _dom.is_muted, editMode: _dom.editModeToggled,
    doublePoints: _dom.doublePointToggled, selectedBaseValue: _dom.selectedBaseValue,
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    systemMessage('Game saved, including every question and score.');
  } catch {
    systemMessage('The game could not be saved. Browser storage may be full or unavailable.');
  }
}

function readLegacySave() {
  if (localStorage.getItem('player1_name') === null || localStorage.getItem('player1_score') === null) return null;
  const players = [];
  for (let i = 1; i <= 5; i++) {
    const name = localStorage.getItem(`player${i}_name`);
    const rawScore = localStorage.getItem(`player${i}_score`);
    if (name === null || rawScore === null) break;
    players.push({name, score: Number(rawScore)});
  }
  return {
    version: 2, players,
    questionLength: Number(localStorage.getItem('questionLength')),
    theme: localStorage.getItem('theme'),
    muted: localStorage.getItem('audioMuted') === 'true',
    editMode: localStorage.getItem('editModeToggled') === 'true',
    doublePoints: localStorage.getItem('doublePointToggled') === 'true',
    selectedBaseValue: 200,
    board: null,
  };
}

export async function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    const save = raw ? JSON.parse(raw) : readLegacySave();
    if (!save) { systemMessage('No saved game found.'); return false; }
    const legacy = !raw;
    if (legacy) {
      // Old saves omitted question content. Validate their settings before requesting a replacement board.
      if (!validSettings(save)) throw new Error('Invalid legacy save');
      if (!_dom.boardReady && !await loadBoard()) return false;
      save.board = structuredClone(_dom.board);
      save.board.forEach((column, col) => column.questions.forEach((clue, row) => {
        clue.used = localStorage.getItem(`r${row}c${col}`) === 'true';
      }));
    }
    if (!validSave(save)) throw new Error('Invalid save');
    ++_dom.boardVersion;
    closeQuestion();
    _dom.board = save.board;
    _dom.boardReady = true;
    _dom.players = save.players;
    _dom.questionLength = save.questionLength;
    _dom.is_muted = save.muted;
    _dom.editModeToggled = save.editMode;
    _dom.doublePointToggled = save.doublePoints;
    _dom.selectedBaseValue = save.selectedBaseValue;
    renderPlayers();
    applySettings();
    changeTheme(save.theme);
    updateBoardValues();
    document.getElementById('board-status').textContent = legacy
      ? 'Older save restored. Its original questions were not stored, so this board uses new questions.'
      : '';
    document.getElementById('retry-questions').hidden = true;
    closeMenu();
    systemMessage(legacy ? 'Older save restored. Save again to keep this question board.' : 'Loaded saved game.');
    return true;
  } catch {
    systemMessage('This save could not be read. Your current game has not been replaced.');
    return false;
  }
}

export async function offerSavedGame() {
  try {
    const exists = localStorage.getItem(SAVE_KEY) !== null || readLegacySave() !== null;
    return exists && confirm('Load your saved Jeopardy game?') ? await loadSave() : false;
  } catch { return false; }
}

document.getElementById('save').addEventListener('click', saveGame);
document.getElementById('load').addEventListener('click', loadSave);
document.getElementById('delete').addEventListener('click', () => {
  try {
    const legacy = readLegacySave() !== null;
    if (!localStorage.getItem(SAVE_KEY) && !legacy) return systemMessage('No saved game found.');
    if (!confirm('Delete the saved Jeopardy game? The game currently on screen will keep running.')) return;
    localStorage.removeItem(SAVE_KEY);
    if (legacy) legacyKeys.forEach(key => localStorage.removeItem(key));
    systemMessage('Saved game deleted.');
  } catch { systemMessage('Browser storage is unavailable. The save could not be deleted.'); }
});
