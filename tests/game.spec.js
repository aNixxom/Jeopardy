import {test, expect} from '@playwright/test';

const saveKey = 'jeopardy.save.v2';
const fixture = category => Array.from({length: 5}, (_, row) => ({
  category: category.replaceAll('_', ' '), question: `${category}: question ${row + 1}?`,
  correctAnswer: `Correct ${row + 1}`, incorrectAnswers: [`Wrong A ${row + 1}`, `Wrong B ${row + 1}`, `Wrong C ${row + 1}`],
}));
async function mockQuestions(page) {
  await page.route('https://the-trivia-api.com/api/questions?**', route => {
    const category = new URL(route.request().url()).searchParams.get('categories');
    return route.fulfill({json: fixture(category)});
  });
}
async function ready(page) {
  await page.goto('/');
  await expect(page.locator('.clue-button:enabled')).toHaveCount(25);
}
async function menu(page) { await page.locator('#menu-button').click(); }
async function save(page) { await menu(page); await page.locator('#save').click(); await menu(page); }
const errors = new WeakMap();
test.beforeEach(async ({page}) => {
  errors.set(page, []);
  page.on('pageerror', error => errors.get(page).push(error.message));
  await mockQuestions(page);
});
test.afterEach(async ({page}) => { expect(errors.get(page)).toEqual([]); });

test('loads exactly five requests; scores the selected row, including double points', async ({page}) => {
  let requests = 0;
  page.on('request', request => { if (request.url().includes('/api/questions?')) requests++; });
  await ready(page);
  expect(requests).toBe(5);
  await page.locator('#r3c0 button').click();
  await expect(page.locator('.questions')).toBeVisible();
  // Clicking spacing between choices must not submit an answer.
  const choiceBounds = await page.locator('.choices').boundingBox();
  await page.mouse.click(choiceBounds.x + choiceBounds.width / 2, choiceBounds.y + 1);
  await expect(page.locator('.questions')).toBeVisible();
  await page.getByRole('button', {name: 'Correct 4', exact: true}).click();
  await expect(page.locator('#r3c0 button')).toBeDisabled();
  await page.locator('#add_p1').click();
  await expect(page.locator('#player1_score')).toHaveText('800');
  await page.locator('#take_p2').click();
  await expect(page.locator('#player2_score')).toHaveText('-800');
  await menu(page);
  await page.getByRole('button', {name: 'Double points', exact: true}).click();
  await menu(page);
  await expect(page.locator('#r4c4 button')).toHaveText('$2000');
  await page.locator('#r4c4 button').click();
  await page.getByRole('button', {name: 'Correct 5', exact: true}).click();
  await page.locator('#add_p1').click();
  await expect(page.locator('#player1_score')).toHaveText('2800');
});

test('failed and incomplete question requests cannot expose blank playable clues', async ({page}) => {
  await page.unrouteAll();
  await page.route('**/api/questions?**', route => route.fulfill({status: 503, body: 'Unavailable'}));
  await page.goto('/');
  await expect(page.locator('#retry-questions')).toBeVisible();
  await expect(page.locator('.clue-button:enabled')).toHaveCount(0);
  await page.unrouteAll();
  await page.route('**/api/questions?**', route => route.fulfill({json: []}));
  await page.locator('#retry-questions').click();
  await expect(page.locator('#retry-questions')).toBeVisible();
  await expect(page.locator('.clue-button:enabled')).toHaveCount(0);
  await page.unrouteAll();
  await mockQuestions(page);
  await page.locator('#retry-questions').click();
  await expect(page.locator('.clue-button:enabled')).toHaveCount(25);
});

test('wrong answers show the answer; cancel preserves clues; timeout works with reduced motion', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await ready(page);
  await page.locator('#r0c0 button').click();
  await page.getByRole('button', {name: 'Back to board'}).click();
  await expect(page.locator('#r0c0 button')).toBeEnabled();
  await page.locator('#r0c0 button').click();
  await page.getByRole('button', {name: 'Wrong A 1', exact: true}).click();
  await expect(page.locator('#popup')).toContainText('The answer was: Correct 1');
  await expect(page.locator('#r0c0 button')).toBeDisabled();
  await menu(page);
  for (let i = 0; i < 11; i++) await page.locator('#take_seconds').click();
  await expect(page.locator('#question_length_text')).toHaveText(' 4s ');
  await menu(page);
  await page.clock.install();
  await page.locator('#r1c0 button').click();
  await page.clock.fastForward(4100);
  await expect(page.locator('.questions')).not.toBeVisible();
  await expect(page.locator('#r1c0 button')).toBeDisabled();
  await expect(page.locator('#popup')).toContainText('Time’s up!');
});

test('save/load restores exact questions, scores, used cells and both directions of settings', async ({page}) => {
  await ready(page);
  await page.evaluate(() => localStorage.setItem('unrelated-app', 'keep me'));
  await page.locator('#r2c0 button').click();
  const originalQuestion = await page.locator('#question-text').textContent();
  await page.getByRole('button', {name: 'Back to board'}).click();
  await page.locator('#add_p1').click();
  await save(page);
  await page.locator('#r2c0 button').click();
  await page.getByRole('button', {name: 'Correct 3', exact: true}).click();
  await page.locator('#add_p1').click();
  await menu(page);
  await page.locator('.settings-toggle-button-two').click();
  await page.locator('.settings-toggle-button-three').click();
  await page.locator('#next-theme').click();
  await page.locator('#add_seconds').click();
  await page.locator('#mute-button').click();
  await page.locator('#load').click();
  await expect(page.locator('#player1_score')).toHaveText('600');
  await expect(page.locator('#r2c0 button')).toBeEnabled();
  await expect(page.locator('#r2c0 button')).toHaveText('$600');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'default');
  await expect(page.locator('#mute-button')).toBeVisible();
  await expect(page.locator('#question-length-icon')).toHaveText('15s');
  await expect(page.locator('.player-name').first()).toBeDisabled();
  await page.locator('#r2c0 button').click();
  await expect(page.locator('#question-text')).toHaveText(originalQuestion);
  await page.getByRole('button', {name: 'Correct 3', exact: true}).click();
  await menu(page);
  await page.locator('.settings-toggle-button-two').click();
  await page.locator('.settings-toggle-button-three').click();
  await page.locator('#next-theme').click();
  await page.locator('#mute-button').click();
  await page.locator('#save').click();
  await page.unrouteAll();
  await page.route('**/api/questions?**', route => route.abort());
  page.once('dialog', dialog => dialog.accept());
  await page.reload();
  await expect(page.locator('#r2c0 button')).toBeDisabled();
  await expect(page.locator('#r4c0 button')).toHaveText('$2000');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('#unmute-button')).toBeVisible();
  await expect(page.locator('.player-name').first()).toBeEnabled();
  await expect(page.locator('#retry-questions')).not.toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('unrelated-app'))).toBe('keep me');
});

test('repeated loads do not duplicate players; removing and readding resets the score', async ({page}) => {
  await ready(page);
  for (const name of ['Alex', 'Sam']) {
    await menu(page); page.once('dialog', dialog => dialog.accept(name)); await page.locator('#add_player').click();
  }
  await page.locator('#add_p5').click();
  await save(page);
  for (let i = 0; i < 2; i++) { await menu(page); await page.locator('#load').click(); }
  await expect(page.locator('.player-name')).toHaveCount(5);
  await expect(page.locator('#player5_score')).toHaveText('200');
  await page.locator('#add_p5').click();
  await expect(page.locator('#player5_score')).toHaveText('400');
  await menu(page); page.once('dialog', dialog => dialog.accept()); await page.locator('#take_player').click();
  await menu(page); page.once('dialog', dialog => dialog.accept('Lee')); await page.locator('#add_player').click();
  await page.locator('#add_p5').click();
  await expect(page.locator('#player5_score')).toHaveText('200');
});

test('corrupt saves leave the current board intact and deleting a save preserves other storage', async ({page}) => {
  await ready(page);
  await page.evaluate(key => {localStorage.setItem(key, '{bad json'); localStorage.setItem('another-app', 'safe');}, saveKey);
  await menu(page);
  await page.locator('#load').click();
  await expect(page.locator('#popup')).toContainText('could not be read');
  await menu(page);
  await expect(page.locator('.clue-button:enabled')).toHaveCount(25);
  await menu(page);
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#delete').click();
  expect(await page.evaluate(key => localStorage.getItem(key), saveKey)).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('another-app'))).toBe('safe');
});

test('legacy saves restore scores and progress with an explicit missing-questions notice', async ({page}) => {
  await page.addInitScript(() => {
    for (let i = 1; i <= 4; i++) { localStorage.setItem(`player${i}_name`, `Player ${i}`); localStorage.setItem(`player${i}_score`, String(i * 200)); }
    localStorage.setItem('questionLength', '6000'); localStorage.setItem('theme', 'purple'); localStorage.setItem('r2c2', 'true');
  });
  page.once('dialog', dialog => dialog.accept());
  await page.goto('/');
  await expect(page.locator('.player-name')).toHaveCount(4);
  await expect(page.locator('#player4_score')).toHaveText('800');
  await expect(page.locator('#r2c2 button')).toBeDisabled();
  await expect(page.locator('#board-status')).toContainText('original questions were not stored');
  await page.locator('#add_p4').click();
  await expect(page.locator('#player4_score')).toHaveText('1000');
});

test('renaming works by touch/keyboard and text is not interpreted as HTML', async ({page}) => {
  await ready(page);
  await page.locator('#menu-button').focus(); await page.keyboard.press('Enter');
  await page.locator('.settings-toggle-button-two').click();
  await menu(page);
  await page.locator('.player-name').first().focus(); await page.keyboard.press('Enter');
  await page.locator('#name-input').fill('<b>Hi</b>');
  await page.getByRole('button', {name: 'Save name'}).click();
  await expect(page.locator('.player-name').first()).toHaveText('<b>Hi</b>');
  await expect(page.locator('.player-name b')).toHaveCount(0);
  await page.locator('.player-name').first().click({button: 'right'});
  await page.getByRole('button', {name: 'Reset Player Name'}).click();
  await expect(page.locator('.player-name').first()).toHaveText('Player 1');
});

test('an in-flight fetch cannot overwrite a restored save', async ({page}) => {
  await ready(page); await save(page);
  const original = await page.evaluate(key => localStorage.getItem(key), saveKey);
  await page.unrouteAll();
  let release;
  const gate = new Promise(resolve => {release = resolve;});
  await page.route('**/api/questions?**', async route => {await gate; await route.fulfill({json: fixture('Replacement')}).catch(() => {});});
  page.once('dialog', dialog => dialog.dismiss());
  await page.reload();
  await expect(page.locator('.clue-button:enabled')).toHaveCount(0);
  await menu(page); await page.locator('#load').click();
  await expect(page.locator('.clue-button:enabled')).toHaveCount(25);
  release();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#headers th').first()).toHaveAttribute('aria-label', JSON.parse(original).board[0].category);
});

for (const width of [375, 768, 1440, 1920]) {
  test(`board, settings and question fit at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900}); await ready(page);
    const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(await fits()).toBe(true);
    await menu(page); expect(await fits()).toBe(true);
    await expect(page.locator('#delete')).toBeInViewport();
    await menu(page); await page.locator('#r4c4 button').click();
    expect(await fits()).toBe(true);
    await expect(page.getByRole('button', {name: 'Back to board'})).toBeInViewport();
  });
}

test('question loading times out with a retry instead of leaving an active empty board', async ({page}) => {
  await page.unrouteAll();
  await page.clock.install();
  await page.route('**/api/questions?**', () => {});
  await page.goto('/');
  await expect(page.locator('#board-status')).toHaveText('Loading questions…');
  await page.clock.fastForward(12100);
  await expect(page.locator('#retry-questions')).toBeVisible();
  await expect(page.locator('.clue-button:enabled')).toHaveCount(0);
});

test('unavailable browser storage does not break gameplay or report a false save', async ({page}) => {
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem', 'removeItem']) Storage.prototype[method] = () => {throw new DOMException('Blocked', 'SecurityError');};
  });
  await ready(page);
  await menu(page); await page.locator('#save').click();
  await expect(page.locator('#popup')).toContainText('could not be saved');
  await menu(page); await page.locator('#r0c0 button').click();
  await page.getByRole('button', {name: 'Correct 1', exact: true}).click();
  await page.locator('#add_p1').click();
  await expect(page.locator('#player1_score')).toHaveText('200');
});

test('the game and local assets work when hosted inside a subdirectory', async ({page}) => {
  const localRequests = [];
  page.on('request', request => {if (request.url().startsWith('http://127.0.0.1:8787/')) localRequests.push(new URL(request.url()).pathname);});
  await page.route('http://127.0.0.1:8787/nested-game/**', route => route.continue({url: route.request().url().replace('/nested-game/', '/')}));
  await page.goto('/nested-game/index.html');
  await expect(page.locator('.clue-button:enabled')).toHaveCount(25);
  expect(localRequests.every(path => path.startsWith('/nested-game/'))).toBe(true);
  await expect.poll(() => page.evaluate(() => document.fonts.check('16px Jeopardy'))).toBe(true);
});
