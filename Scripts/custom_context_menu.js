import {_dom} from '/Scripts/game_variables.js'

var menu = document.querySelector('.context-menu') // Gets 'context-menu' from DOM 

function showEditMenu() {
    menu.style.display = "block"
    menu.style.display = "initial"
    menu.style.position = 'absolute';
    menu.style.opacity = 1;
    menu.style.left = event.pageX + 'px';  //set context menu pos where user clicked
    menu.style.top = event.pageY + 'px';    //show context menu pos where user clicked
}

function hideEditMenu() {
    menu.style.display = "none"
}

function removeInputMenu() {
    document.querySelectorAll('#name-input').forEach(e => e.remove())
}

window.addEventListener("click", function(event){
    if(event.target.closest('.context-menu'))
    return;
        hideEditMenu()
})

export { hideEditMenu, removeInputMenu, showEditMenu }
