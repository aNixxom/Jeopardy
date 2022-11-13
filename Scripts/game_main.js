import {_dom} from '/Scripts/game_variables.js'

let every_id = document.querySelectorAll('*[id]')

const stopAnimation = () => { // Progress Bar animation event (end)
    const progressBar = document.querySelectorAll(".timer-bar")
    for (let i = 0; i < progressBar.length;  i++) {
        progressBar[i].removeAttribute("id", 'play-timer-animation');
        _dom.main.style.visibility = "visible"
        _dom.viewingQuestion = false
        stopMusic(_dom.countdown_music)
        if(_dom.correct_answer == true && _dom.answered_question == true) {
            _dom.corret_answer_sound.play() 
        } else if(_dom.correct_answer != true) {
            _dom.times_up.play()
        }
    }
}

const playAnimation = ()  => { // Progress Bar animation event (start)
    const progressBar = document.querySelectorAll(".timer-bar") // Gets all the questions with ".timer-bar"
    for (var i = 0; i < progressBar.length;  i++) {
        if(_dom.doubleTimeCheatEnabled == true) {
            _dom.countdown_music.play()
            progressBar[i].setAttribute("id", 'play-timer-animation-double');
            setTimeout(stopMusic(_dom.countdown_music), 12000)

        } else if(_dom.doubleTimeCheatEnabled == false) {
            _dom.countdown_music.play()
            progressBar[i].removeAttribute("id", 'play-timer-animation-double')
            progressBar[i].setAttribute("id", 'play-timer-animation');
        }
    }
}

window.addEventListener('click', function(event){
    const clicked_element = document.getElementById(event.target.id) // $

    for (let i = 0; i < every_id.length; i++) {
        try {
            if(clicked_element.classList[1] == every_id[i].id) {
                const question_id = clicked_element.classList[1]
                const question = document.getElementById(question_id)
                let choices = question.children[1]
                
                question.setAttribute('class', 'questions animate__animated animate__zoomIn')

                _dom.viewingQuestion = true
                _dom.main.style.visibility = "hidden"
                question.style.visibility = "visible"
                question.style.top = "0px"
                question.style.right = "0px"

                if(_dom.viewingQuestion == true) {
                    _dom.double_time_icon.style.cursor = "not-allowed"
                    _dom.edit_mode_icon.style.cursor = "not-allowed"
                    _dom.double_points_icon.style.cursor = "not-allowed"
                    _dom.menu_button.style.cursor = "not-allowed"
                }

                choices.addEventListener('click', function(event) {
                    let clicked_answer = event.target
                    if(_dom.viewingQuestion == true && question_id) {
                        if(clicked_answer.id.includes(question_id)) {
                            _dom.correct_answer = true
                            _dom.answered_question = true

                            exitQuestion()

                            _dom.correct_answer = false //reset for next question
                        } else if(!clicked_answer.id.includes(question_id)) { //if user did not  select right answer 
                            _dom.correct_answer = false // set to false to the times_up.mp3 will not play
                            _dom.answered_question = true // set to true to prevent animations from running more than once
                            exitQuestion()
                            _dom.correct_answer = false // reset for next question
                        } else {
                            console.log("What the fuck")
                        }
                    }
                })

                setTimeout(playAnimation())
                setTimeout(showQuestion, _dom.questionLength)

                function showQuestion() {
                    if(_dom.answered_question == true) {
                       return
                    } else if(_dom.answered_question != true) {
                        exitQuestion()
                    }
                }

                function exitQuestion() {
                    let question_number = clicked_element.classList[1]
                    let question_value = clicked_element.classList[2]
                    
                    stopAnimation()
                    question.style.visibility = "hidden"
                    clicked_element.innerText = "-"
                    clicked_element.style.pointerEvents = "none"
                    clicked_element.setAttribute('class', `boxes ${question_number} ${question_value} used`)
        
                    _dom.viewingQuestion = false
                    _dom.menu_button.style.cursor = "pointer"
                    _dom.double_time_icon.style.cursor = "pointer"
                    _dom.edit_mode_icon.style.cursor = "pointer"
                    _dom.double_points_icon.style.cursor = "pointer"
                }
          }
        } catch(error) {

        }
  }
});

function stopMusic(sound) {
    sound.pause()
    sound.currentTime = 0
}


export{stopAnimation}
