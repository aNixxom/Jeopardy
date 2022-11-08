    import {_dom, _pVars} from '/Scripts/game_variables.js'
    import {closeMenu} from '/Scripts/game_settings.js'

    let current_player_count = document.getElementById('player_count')
    let settingsContainer = document.getElementById('settingsContainer')
    let popup = document.getElementById('popup')
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

    function systemMessage(message) { //default show_time is 27000
        popup.innerHTML = message
        popup.className = "show"
               
        setTimeout(function(){popup.className = popup.className.replace("show", "") }, 2700)
    }

    function screenShake() {
        settingsContainer.className = "shake shake-horizontal"
        setTimeout(function(){settingsContainer.className = settingsContainer.className.replace("shake shake-horizontal", "") }, 110)
    }

    function addPlayer() {
        if(_pVars.total_players >= 7) {
            screenShake()
            systemMessage("You can't have more than 7 players")
            return
        } else {
        }
        
        const tr_player_names = document.getElementById('player_names')
        let th_player_name = document.createElement('th') // Creates player name
        let playerName = prompt("Enter Name")

        if(playerName == null || playerName.length > 8 || playerName.length == 0) { // If player does not enter a name, or they hit cancel return and break the function
            screenShake()
            systemMessage('Please enter a valid name')
            return
        } else if (playerName != null && playerName != "") {

            console.log(playerName.length)
            _pVars.players_added += 1 // add 1 to player list
            _pVars.total_players = _pVars.players_added + _pVars.starting_players // new player total 
            let player_Number = _pVars.total_players.toString()
            let number_of_players = (` ${player_Number} `)

            let new_player_score = ("player" + player_Number + "_score")
            let new_player_name = ("player" + player_Number + "_name")
            let new_player_buttons = ("player" + player_Number + "_buttons")
            player_buttons_list.push(new_player_buttons)
            player_list.push(new_player_score)
            player_name_list.push(new_player_name)

            current_player_count.innerText = number_of_players

            if(_dom.editModeToggled == false) {
                th_player_name.setAttribute('class', "headers")
            } else {
                th_player_name.setAttribute('class', "headers headers-edit")
            }
            th_player_name.setAttribute('id', `player${player_Number}_name`)
            th_player_name.innerText = playerName // sets player name to the table cell
            tr_player_names.appendChild(th_player_name) // Appends player name to the player name table

            const tr_player_score_text = document.getElementById('player_score_text')
            let th_player_score_text = document.createElement('th') // Creates player score text (0)


            th_player_score_text.setAttribute('class', "score_boxes ")
            th_player_score_text.setAttribute('id', "player" + player_Number + "_score")
            th_player_score_text.innerText = 0
            tr_player_score_text.appendChild(th_player_score_text)

            const tr_player_score_buttons = document.getElementById('player_score_buttons')
            let td_player_score_buttons = document.createElement('td')
            let td_add_button = document.createElement('button') // Creates ADD button for player
            let td_take_button = document.createElement('button') // Creates TAKE button for player

            td_add_button.innerText = "ADD"
            td_add_button.setAttribute('id', `add_p${player_Number}`)
            td_add_button.setAttribute('class', "points-button")

            td_take_button.innerText = "TAKE"
            td_take_button.setAttribute('id', `take_p${player_Number}`)
            td_take_button.setAttribute('class', "points-button")

            td_player_score_buttons.setAttribute('id', `player${player_Number}_buttons`)

            td_player_score_buttons.appendChild(td_add_button) // Appends ADD button to new player
            td_player_score_buttons.appendChild(td_take_button) // Appends TAKE button to new player
            tr_player_score_buttons.appendChild(td_player_score_buttons) // Appends TAKE & ADD to MAIN table
            closeMenu()
        }
    }

    function addSavedPlayer(savedPlayerName, savedPlayerScore) {
        if(_pVars.total_players >= 7) {
            screenShake()
            systemMessage("You can't have more than 7 players")
            return
        } else {
        }
        
        const tr_player_names = document.getElementById('player_names')
        let th_player_name = document.createElement('th') // Creates player name
        let playerName = savedPlayerName

        if(playerName == null || playerName == "" || playerName.length <= 10) { // If player does not enter a name, or they hit cancel return and break the function
            screenShake()
            systemMessage('Please enter a valid name')
            return
        } else if (playerName != null && playerName != "") {

            _pVars.players_added += 1 // add 1 to player list
            _pVars.total_players = _pVars.players_added + _pVars.starting_players // new player total 
            let player_Number = _pVars.total_players.toString()
            let number_of_players = (` ${player_Number} `)

            let new_player_score = ("player" + player_Number + "_score")
            let new_player_name = ("player" + player_Number + "_name")
            let new_player_buttons = ("player" + player_Number + "_buttons")
            player_buttons_list.push(new_player_buttons)
            player_list.push(new_player_score)
            player_name_list.push(new_player_name)

            current_player_count.innerText = number_of_players

            th_player_name.setAttribute('class', "headers")
            th_player_name.setAttribute('id', `player${player_Number}_name`)
            th_player_name.innerText = playerName // sets player name to the table cell
            tr_player_names.appendChild(th_player_name) // Appends player name to the player name table

            const tr_player_score_text = document.getElementById('player_score_text')
            let th_player_score_text = document.createElement('th') // Creates player score text (0)


            th_player_score_text.setAttribute('class', "score_boxes ")
            th_player_score_text.setAttribute('id', "player" + player_Number + "_score")
            th_player_score_text.innerText = savedPlayerScore
            tr_player_score_text.appendChild(th_player_score_text)

            const tr_player_score_buttons = document.getElementById('player_score_buttons')
            let td_player_score_buttons = document.createElement('td')
            let td_add_button = document.createElement('button') // Creates ADD button for player
            let td_take_button = document.createElement('button') // Creates TAKE button for player

            td_add_button.innerText = "ADD"
            td_add_button.setAttribute('id', `add_p${player_Number}`)
            td_add_button.setAttribute('class', "points-button")

            td_take_button.innerText = "TAKE"
            td_take_button.setAttribute('id', `take_p${player_Number}`)
            td_take_button.setAttribute('class', "points-button")

            td_player_score_buttons.setAttribute('id', `player${player_Number}_buttons`)

            td_player_score_buttons.appendChild(td_add_button) // Appends ADD button to new player
            td_player_score_buttons.appendChild(td_take_button) // Appends TAKE button to new player
            tr_player_score_buttons.appendChild(td_player_score_buttons) // Appends TAKE & ADD to MAIN table
            closeMenu()
        }
    }

    function takePlayer() {

        if(_pVars.total_players <= 3) {
            systemMessage("You can't have less than 3 players")
            screenShake()
            return
        }

        let checkPoint = confirm("Are you sure you want to remove a player?")
        if(checkPoint != false) {
            let every_id = document.querySelectorAll('*[id]')
            _pVars.players_added -= 1
            _pVars.total_players = _pVars.players_added + _pVars.starting_players 
        
            let player_Number = _pVars.total_players.toString()
            let number_of_players = (` ${player_Number} `)
        
            current_player_count.innerText = number_of_players
        
            let player_score_to_remove = player_list.pop()//gets last score in list
            let player_name_to_remove = player_name_list.pop() //gets last name in list
            let player_name_to_remove_string = document.getElementById(player_name_to_remove)
            let player_buttons_to_remove = player_buttons_list.pop() //gets last button in list
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
                systemMessage(`Successfully removed player ${player_name_to_remove_string.innerHTML}`);
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

    export { player_buttons_list, player_name_list, player_list, systemMessage, screenShake, addSavedPlayer}
