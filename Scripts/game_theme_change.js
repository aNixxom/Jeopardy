import {_dom, _themes} from '/Scripts/game_variables.js'

let stylesheet = document.getElementById('stylesheet')
let previous_theme_button = document.getElementById('previous-theme')
let next_theme_button = document.getElementById('next-theme')
let current_theme = document.getElementById('current-theme')

next_theme_button.addEventListener('click', nextTheme)
previous_theme_button.addEventListener('click', previousTheme)

function nextTheme() {
    if(_dom.current_stylesheet + 1 >= _themes.length) {
        return
    } else if (_dom.current_stylesheet < _themes.length) {
        _dom.current_stylesheet += 1
    }
    setStyleSheet(_themes[_dom.current_stylesheet])
}

function previousTheme() {
    if(_dom.current_stylesheet < _themes.length && _dom.current_stylesheet - 1 != -1) {
        _dom.current_stylesheet -= 1
    }
    setStyleSheet(_themes[_dom.current_stylesheet])
}

function setStyleSheet(url) {
  stylesheet.setAttribute('href', url)
  let themeText = _themes[_dom.current_stylesheet].split(/[/.]/)
  _dom.current_theme.innerText = ` ${themeText[1]} `
}

 export {setStyleSheet}
