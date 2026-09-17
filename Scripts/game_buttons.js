import {_dom} from './game_variables.js';

document.getElementById('player_score_buttons').addEventListener('click', event => {
  if (_dom.viewingQuestion || !_dom.boardReady) return;
  const match = event.target.closest('button')?.id.match(/^(add|take)_p([1-5])$/);
  if (!match) return;
  const player = _dom.players[Number(match[2]) - 1];
  if (!player) return;
  player.score += (match[1] === 'add' ? 1 : -1) * _dom.default_point_value;
  document.getElementById(`player${match[2]}_score`).textContent = player.score;
});
