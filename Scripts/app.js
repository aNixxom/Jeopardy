import {_dom} from './game_variables.js';
import {applySettings} from './game_settings.js';
import {renderPlayers} from './createNewPlayers.js';
import {changeTheme} from './game_theme_change.js';
import {loadBoard} from './api.js';
import {offerSavedGame} from './game_save.js';
import './game_buttons.js';
import './edit_player_name.js';

_dom.menu_button.setAttribute('aria-expanded', 'false');
renderPlayers();
applySettings();
changeTheme('default');
if (!await offerSavedGame()) await loadBoard();
