import {_dom} from './game_variables.js';
import {systemMessage, playAudio, stopAudio} from './ui.js';

const table = document.createElement('table');
table.id = 'main_table';
table.className = 'main_table';
table.setAttribute('aria-label', 'Jeopardy question board');
const headers = table.createTHead().insertRow();
headers.id = 'headers';
for (let column = 0; column < 5; column++) {
  const header = document.createElement('th');
  header.scope = 'col';
  header.className = 'headers';
  header.textContent = 'Loading…';
  headers.append(header);
}
const body = table.createTBody();
for (let row = 0; row < 5; row++) {
  const tr = body.insertRow();
  for (let column = 0; column < 5; column++) {
    const cell = tr.insertCell();
    cell.id = `r${row}c${column}`;
    cell.className = 'boxes';
    const button = document.createElement('button');
    button.className = 'clue-button';
    button.type = 'button';
    button.disabled = true;
    button.textContent = `$${(row + 1) * 200}`;
    button.addEventListener('click', () => openQuestion(column, row));
    cell.append(button);
  }
}
_dom.main.insertBefore(table, document.getElementById('player-info-table'));

const dialog = document.createElement('dialog');
dialog.className = 'questions';
dialog.setAttribute('aria-labelledby', 'question-text');
const questionText = document.createElement('h1');
questionText.id = 'question-text';
questionText.className = 'question-color';
const choices = document.createElement('div');
choices.className = 'choices';
const timerContainer = document.createElement('div');
timerContainer.className = 'timer-container';
timerContainer.setAttribute('aria-hidden', 'true');
const timerBar = document.createElement('div');
timerBar.className = 'timer-bar';
timerContainer.append(timerBar);
const back = document.createElement('button');
back.className = 'question-back';
back.textContent = 'Back to board';
back.addEventListener('click', () => closeQuestion(false));
dialog.append(questionText, choices, timerContainer, back);
document.body.append(dialog);
dialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeQuestion(false);
});
let activeQuestion = null;
let questionTimeout;
let deadline;
const compactCategories = {
  'General Knowledge': 'General',
  'Arts & Literature': 'Arts & lit.',
  'Society & Culture': 'Society',
  'Sport & Leisure': 'Sports',
};

export function updateBoardValues() {
  const multiplier = _dom.doublePointToggled ? 2 : 1;
  _dom.default_point_value = _dom.selectedBaseValue * multiplier;
  for (let column = 0; column < 5; column++) {
    const category = _dom.board[column]?.category || 'Loading…';
    const header = headers.children[column];
    header.replaceChildren();
    const fullLabel = document.createElement('span');
    fullLabel.className = 'category-full';
    fullLabel.textContent = category;
    const compactLabel = document.createElement('span');
    compactLabel.className = 'category-compact';
    compactLabel.textContent = compactCategories[category] || category;
    compactLabel.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-label', category);
    header.title = category;
    header.append(fullLabel, compactLabel);
    for (let row = 0; row < 5; row++) {
      const clue = _dom.board[column]?.questions[row];
      const cell = document.getElementById(`r${row}c${column}`);
      const button = cell.firstElementChild;
      const value = (row + 1) * 200 * multiplier;
      cell.dataset.used = String(Boolean(clue?.used));
      button.disabled = !_dom.boardReady || !clue || clue.used;
      button.textContent = clue?.used ? '—' : `$${value}`;
      button.setAttribute('aria-label', `${_dom.board[column]?.category || 'Question'}, $${value}${clue?.used ? ', used' : ''}`);
    }
  }
}

function openQuestion(column, row) {
  const clue = _dom.board[column]?.questions[row];
  if (!_dom.boardReady || _dom.viewingQuestion || !clue || clue.used) return;
  activeQuestion = clue;
  _dom.viewingQuestion = true;
  _dom.selectedBaseValue = (row + 1) * 200;
  _dom.default_point_value = _dom.selectedBaseValue * (_dom.doublePointToggled ? 2 : 1);
  questionText.textContent = clue.question;
  choices.replaceChildren();
  clue.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = answer;
    button.addEventListener('click', () => {
      if (!activeQuestion) return;
      if (Date.now() >= deadline) return finishQuestion(null);
      finishQuestion(index === clue.correctIndex);
    });
    choices.append(button);
  });
  dialog.showModal();
  timerBar.style.animation = 'none';
  void timerBar.offsetWidth;
  timerBar.style.animation = `timer-bar-animation ${_dom.questionLength}ms linear forwards`;
  deadline = Date.now() + _dom.questionLength;
  questionTimeout = setTimeout(() => finishQuestion(null), _dom.questionLength);
  playAudio(_dom.countdown_music);
}

function finishQuestion(correct) {
  if (!activeQuestion) return;
  const answer = activeQuestion.answers[activeQuestion.correctIndex];
  systemMessage(correct === true ? 'Correct! Use ADD to award the selected clue’s points.' : `${correct === null ? 'Time’s up! ' : ''}The answer was: ${answer}`);
  playAudio(correct === true ? _dom.correct_answer_sound : _dom.times_up);
  closeQuestion(true);
}

export function closeQuestion(used = false) {
  clearTimeout(questionTimeout);
  stopAudio(_dom.countdown_music);
  if (activeQuestion && used) activeQuestion.used = true;
  activeQuestion = null;
  _dom.viewingQuestion = false;
  timerBar.style.animation = 'none';
  if (dialog.open) dialog.close();
  updateBoardValues();
}
