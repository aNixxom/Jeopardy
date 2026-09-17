import {_dom} from './game_variables.js';
import {updateBoardValues} from './game_main.js';

const categories = ['history', 'music', 'general_knowledge', 'science', 'film_and_tv',
  'food_and_drink', 'sports', 'geography', 'arts_and_literature', 'society_and_culture'];

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function loadBoard() {
  const version = ++_dom.boardVersion;
  _dom.boardReady = false;
  updateBoardValues();
  const status = document.getElementById('board-status');
  const retry = document.getElementById('retry-questions');
  status.textContent = 'Loading questions…';
  retry.hidden = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const board = await Promise.all(shuffle(categories).slice(0, 5).map(async category => {
      const response = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=5&difficulty=medium`, {signal: controller.signal});
      if (!response.ok) throw new Error(`Question service returned ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data) || data.length !== 5) throw new Error('Incomplete question set');
      const questions = data.map(item => {
        if (typeof item.question !== 'string' || !item.question.trim() ||
            typeof item.correctAnswer !== 'string' || !item.correctAnswer.trim() ||
            typeof item.category !== 'string' || !item.category.trim() ||
            !Array.isArray(item.incorrectAnswers) || item.incorrectAnswers.length !== 3 ||
            item.incorrectAnswers.some(answer => typeof answer !== 'string' || !answer.trim())) {
          throw new Error('Invalid question data');
        }
        const answers = shuffle([item.correctAnswer, ...item.incorrectAnswers]);
        if (new Set(answers).size !== 4) throw new Error('Duplicate answers');
        return {question: item.question, answers, correctIndex: answers.indexOf(item.correctAnswer), used: false};
      });
      return {category: data[0].category, questions};
    }));
    // An older network response must never overwrite a loaded save or a retry.
    if (version !== _dom.boardVersion) return false;
    _dom.board = board;
    _dom.boardReady = true;
    status.textContent = '';
    updateBoardValues();
    return true;
  } catch (error) {
    controller.abort();
    if (version !== _dom.boardVersion) return false;
    status.textContent = 'Questions could not be loaded. Check your connection and try again, or load a saved game.';
    retry.hidden = false;
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
document.getElementById('retry-questions').addEventListener('click', loadBoard);
