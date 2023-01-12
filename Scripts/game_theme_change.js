import {_dom, _themes} from '/Scripts/game_variables.js'

let stylesheet = document.getElementById('stylesheet')
let previous_theme_button = document.getElementById('previous-theme')
let next_theme_button = document.getElementById('next-theme')

next_theme_button.addEventListener('click', nextTheme)
previous_theme_button.addEventListener('click', previousTheme)

function nextTheme() {
    if(_dom.current_stylesheet + 1 >= _themes.length) {
        return
    } else if (_dom.current_stylesheet < _themes.length) {
        _dom.current_stylesheet += 1
    }
    changeTheme(_themes[_dom.current_stylesheet])
}

function previousTheme() {
    if(_dom.current_stylesheet < _themes.length && _dom.current_stylesheet - 1 != -1) {
        _dom.current_stylesheet -= 1
    }
    changeTheme(_themes[_dom.current_stylesheet])
}

function changeTheme(theme) {
    let root = document.querySelector(':root');
    switch (theme) {
        case 'default': 
            root.style.setProperty('--theme-point-color', '#d7a04b')
            root.style.setProperty('--theme-box-background-color', '#010a78')
            root.style.setProperty('--theme-background', '#010a78')
            root.style.setProperty('--theme-points-color', '#d7a04b')
            root.style.setProperty('--theme-timer-color', '#d7a04b')
            root.style.setProperty('--theme-text-color', '#d7a04b')
            root.style.setProperty('--theme-border', '2px solid #d7a04b')
            root.style.setProperty('--theme-outline', '2px solid #d7a04b')
            root.style.setProperty('--theme-button-active', '#030a58')
            root.style.setProperty('--theme-boxes-border-color', '#d7a04b')
            _dom.current_theme.innerText = ` ${_themes[_dom.current_stylesheet]} `
            break;
        case 'light':
            root.style.setProperty('--theme-point-color', 'white')
            root.style.setProperty('--theme-box-background-color', '#808080')
            root.style.setProperty('--theme-background', '#808080')
            root.style.setProperty('--theme-points-color', 'white')
            root.style.setProperty('--theme-timer-color', 'white')
            root.style.setProperty('--theme-text-color', 'white')
            root.style.setProperty('--theme-border', '2px solid white')
            root.style.setProperty('--theme-outline', '2px solid white')
            root.style.setProperty('--theme-button-active', '#9C9999')
            root.style.setProperty('--theme-boxes-border-color', 'white')
            _dom.current_theme.innerText = ` ${_themes[_dom.current_stylesheet]} `
            break;
        case 'purple':
            root.style.setProperty('--theme-point-color', 'white')
            root.style.setProperty('--theme-box-background-color', '#6b1195')
            root.style.setProperty('--theme-background', '#6b1195')
            root.style.setProperty('--theme-points-color', 'white')
            root.style.setProperty('--theme-timer-color', 'white')
            root.style.setProperty('--theme-text-color', 'white')
            root.style.setProperty('--theme-border', '2px solid white')
            root.style.setProperty('--theme-outline', '2px solid white')
            root.style.setProperty('--theme-button-active', '#510872')
            root.style.setProperty('--theme-boxes-border-color', 'white')
            _dom.current_theme.innerText = ` ${_themes[_dom.current_stylesheet]} `
            break;
        default:
            console.warn("Theme does not exist")
    }
}

 export {changeTheme}
