let themes = [
    "light-theme-option",
    "dark-theme-option",
    "default-theme-option"
]



window.addEventListener('click', changeTheme)


function changeTheme(e) {
    console.log(e.target.id);

    for(let i = 0; i < themes.length; i++) {
        if (e.target.id == themes[i]) { // If clicked element is a theme 
            if(e.target.id == themes[0]) {
                setStyleSheet('CSS/light.css')
            }
        }
    }
}

function setStyleSheet(url) {
  let stylesheet = document.getElementById('stylesheet')
  stylesheet.setAttribute('href', url)
}

