# Jeopardy

A browser-based, host-scored trivia board for three to five players. It uses plain JavaScript modules, local audio and fonts, and The Trivia API for new questions. No build step or production npm dependencies are required.

## Local development

`npm start` serves the game at http://127.0.0.1:8787. ES modules require HTTP; opening `index.html` directly as a file will not work. `PORT=8788 npm start` selects a different port. Paths are relative, so the app can also be hosted under a subdirectory.

## Playing

Choose a clue, select an answer, then use ADD or TAKE under a player to adjust their score by that clue’s value. Scoring remains manual so a host can choose which player to credit. Double Points changes all clue values and the scoring amount. Back to board or Escape cancels an unanswered clue without consuming it.

Settings include three to five players, a 4–60 second timer, sound, three themes, and Edit Mode. In Edit Mode, click or keyboard-activate a player name to rename it; the original right-click menu also works.

Save game stores the complete board, used clues, names, scores and settings in the browser under `jeopardy.save.v2`. Load save replaces the current game with that snapshot. Delete save removes only the saved Jeopardy data and leaves the current game running. Saves belong to the current browser and site address; changing the localhost port uses a different storage area.

New boards require an internet connection. Once the app itself is loaded, saved boards can be restored without contacting the question service. Older saves recover player data, settings and used cells; their original question text was never stored and cannot be recovered.

## Verification

`npm ci` installs the test dependencies. `npm test` runs the Playwright browser regression suite using an installed Google Chrome and automatically starts/stops an isolated local server. Tests use deterministic question responses; live API behavior can be checked separately through the running game. The test command uses a relative CLI path so it works from this repository’s macOS directory containing colons.

Coverage includes selected-clue scoring, Double Points, correct/wrong answers, cancellation, reduced-motion timers, failed/incomplete/timed-out requests, save restoration without the API, repeated loads, legacy saves, corrupt or unavailable storage, unrelated storage preservation, player removal, keyboard/touch renaming, stale network responses, subdirectory hosting, and layouts at 375/768/1440/1920px.

## Code assessment

The original failures came primarily from multiple sources of truth: DOM text, hard-coded player score variables, a separate question JSON file, and localStorage keys each described a different version of the game. Score changes, removed players and restored settings consequently disagreed.

`Scripts/game_variables.js` now owns the live board and player data. The board retains question data after a clue is used; rendering and persistence consume the same state. `app.js` makes startup explicit, `api.js` validates and atomically loads five categories, and `game_save.js` validates versioned saves before applying them. Rendering API content and player names through textContent prevents that content from becoming executable markup.

The plain JavaScript approach fits this project. Remaining product opportunities are a dedicated new-game flow, category/difficulty selection, and optional automatic scoring with an explicitly selected active player. They are separate features, not part of the repair. The unused legacy `questions.json`, empty `response.json`, and `assets/index.html` were retained; the running game does not depend on them.

Question provider: [The Trivia API](https://the-trivia-api.com/).
