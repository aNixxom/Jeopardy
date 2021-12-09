import {_dom} from '/Scripts/game_variables.js'

let current_theme = document.getElementById('current-theme')
let stylesheet = document.getElementById('stylesheet')
let themes = [
    "light-theme-option",
    "dark-theme-option",
    "default-theme-option"
]



window.addEventListener('click', changeTheme)
current_theme.addEventListener('mouseover', showThemeMenu)

function changeTheme(e) {
    //console.log(e.target.id);

    for(let i = 0; i < themes.length; i++) {
        if (e.target.id == themes[i]) { // If clicked element is a valid theme 
            if(e.target.id == themes[0]) {
                setStyleSheet('CSS/light.css')
                _dom.colorTheme = "Light"
                document.getElementById('current-theme').innerText = _dom.colorTheme
                hideThemeMenu()
            } else if(e.target.id = themes[1]) {
                setStyleSheet('CSS/style.css')
                _dom.colorTheme = "Default"
                document.getElementById('current-theme').innerText = _dom.colorTheme
            }
        }
    }
}

function showThemeMenu() {
    theme_list.style.display = "block"
}

function hideThemeMenu() {
    theme_list.style.display = "none"
}   

function setStyleSheet(url) {
  stylesheet.setAttribute('href', url)
}
