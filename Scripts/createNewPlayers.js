import {_dom} from '/Scripts/game_variables.js'
import {closeMenu} from '/Scripts/game_settings.js'
import {_pVars} from '/Scripts/test.js'

var current_player_count = document.getElementById('player_count')
let player_list = [ // Default player count
    'player1_score',
    'player2_score',
    'player3_score'
]

let player_name_list = [
    'player1_name',
    'player2_name',
    'player3_name'
]

let player_buttons_list = [
    'player1_buttons',
    'player2_buttons',
    'player3_buttons'
]

// console.log(player_list) //Debug
// console.log(player_name_list) //Debug
// console.log(player_buttons_list) //Debug

function addPlayer() {
    if(_pVars.total_players >= 8) {
        alert("You can not have more than 7 players")
        return
    } else {
        _pVars.players_added += 1
    }
    
    _pVars.total_players = _pVars.players_added + _pVars.starting_players 
    var player_Number = _pVars.total_players.toString()
    var number_of_players = (` ${player_Number} `)

    const tr_player_names = document.getElementById('player_names')
    let th_player_name = document.createElement('th') // Creats player name
    let playerName = prompt("Enter Name")

    if(playerName == null || playerName == "") { // If player does not enter a name, or they hit cancel return and break the function
        return
    } else {
        var s_test = ("player" + player_Number + "_score")
        var n_test = ("player" + player_Number + "_name")
        var b_test = ("player" + player_Number + "_buttons")
        player_buttons_list.push(b_test)
        player_list.push(s_test)
        player_name_list.push(n_test)

        // console.log(player_list) // Debug
        // console.log(player_name_list) //Debug 
        // console.log(player_buttons_list) // Debug
    }
    current_player_count.innerText = number_of_players

    th_player_name.setAttribute('class', "headers")
    th_player_name.setAttribute('id', `player${player_Number}_name`)
    th_player_name.innerText = playerName // sets player name to the table cell
    tr_player_names.appendChild(th_player_name) // Appends player name to the player name table

    const tr_player_score_text = document.getElementById('player_score_text')
    let th_player_score_text = document.createElement('th') // Creats player score text (0)
    //let player_score_id = ("player" + player_Number + "_score") //Not needed


    th_player_score_text.setAttribute('class', "score_boxes")
    th_player_score_text.setAttribute('id', "player" + player_Number + "_score")
    th_player_score_text.innerText = 0
    tr_player_score_text.appendChild(th_player_score_text)

    const tr_player_score_buttons = document.getElementById('player_score_buttons')
    let td_player_score_buttons = document.createElement('td')
    let td_add_button = document.createElement('button') // Creates ADD button for player
    let td_take_button = document.createElement('button') // Creats TAKE button for player
    //var add_player_id = ("add_p" + player_Number) // Should return a string Ex: "add_p5" (Not needed)
    //var take_player_id = ("take_p" + player_Number) // Should return a string Ex: "take_p5" (Not needed)

    td_add_button.innerText = "ADD"
    td_add_button.setAttribute('id', `add_p${player_Number}`)

    td_take_button.innerText = "TAKE"
    td_take_button.setAttribute('id', `take_p${player_Number}`)

    td_player_score_buttons.setAttribute('id', `player${player_Number}_buttons`)

    td_player_score_buttons.appendChild(td_add_button) // Appends ADD button to new player
    td_player_score_buttons.appendChild(td_take_button) // Appends TAKE button to new player
    tr_player_score_buttons.appendChild(td_player_score_buttons) // Appends TAKE & ADD to MAIN table

    closeMenu()

}

function takePlayer() {

    var every_id = document.querySelectorAll('*[id]')
    _pVars.players_added -= 1
    _pVars.total_players = _pVars.players_added + _pVars.starting_players 

    var player_Number = _pVars.total_players.toString()
    var number_of_players = (` ${player_Number} `)
    current_player_count.innerText = number_of_players
    //player_list.pop(number_of_players)

    //console.log(player_list) //Debuging
    //console.log(player_list[player_list.length - 1]) //Debug

    let player_score_to_remove = player_list[player_list.length - 1] //gets last score in list
    let player_name_to_remove = player_name_list[player_name_list.length -1] //gets last name in list
    let player_buttons_to_remove = player_buttons_list[player_buttons_list.length -1] //gets last button in list

    var checkPoint = confirm("Are you sure you want to remove a player?")
    if(checkPoint == true) {
        for (let i = 0; i < every_id.length; i++) {
            if(player_score_to_remove == every_id[i].id) {
                let score_to_remove = document.getElementById(player_score_to_remove)
                score_to_remove.remove()
            } 
            if(player_name_to_remove == every_id[i].id) {
                let player_name_remove = document.getElementById(player_name_to_remove)
                player_name_remove.remove()
            }
    
            if(player_buttons_to_remove == every_id[i].id) {
                let player_button_remove = document.getElementById(player_buttons_to_remove)
                player_button_remove.remove()
            }
            closeMenu()
        }
    } else {
        return 
    }

    if(_pVars.total_players <= 0) {
        alert("You can not have 0 players")
        return
    } 
}
_dom.add_player.onclick = function () {addPlayer()}
_dom.take_player.onclick = function () {takePlayer()}

export { player_buttons_list, player_name_list, player_list}
