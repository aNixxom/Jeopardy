//var questionLength = 6000 // Default 6000 (six seconds)
let every_id = document.querySelectorAll('*[id]')
import {_dom} from '/Scripts/game_variables.js'

const stopAnimation = () => { // Progress Bar animation event (end)
    const progressBar = document.querySelectorAll(".timer-bar")
    for (var i = 0; i < progressBar.length;  i++) {
        progressBar[i].removeAttribute("id", 'play-timer-animation');
        _dom.main.style.visibility = "visible"
        _dom.viewingQuestion = false

    }
}

const playAnimation = ()  => { // Progress Bar animation event (start)
    console.log("doubleTimeCheatEnabled: " + _dom.doubleTimeCheatEnabled)
    const progressBar = document.querySelectorAll(".timer-bar") // Gets all the questions with ".timer-bar"
    for (var i = 0; i < progressBar.length;  i++) {
        if(_dom.doubleTimeCheatEnabled == true) {
            progressBar[i].setAttribute("id", 'play-timer-animation-double');
        } else if(_dom.doubleTimeCheatEnabled == false) {
            progressBar[i].removeAttribute("id", 'play-timer-animation-double')
            progressBar[i].setAttribute("id", 'play-timer-animation');
        }
    }
}

if(_dom.viewingQuestion == true) {
    _dom.menu_button.style.cursor = "not-allowed"
}

window.addEventListener('click', function(event){
const clicked_element = document.getElementById(event.target.id)

    for (let i = 0; i < every_id.length; i++) {
        try {
            if(clicked_element.classList[1] == every_id[i].id) {
                const question_id = clicked_element.classList[1]
                const question = document.getElementById(question_id)

                console.info("CURRENT QUESTION:", question_id)
                console.log(_dom.doubleTimeCheatEnabled)
                _dom.viewingQuestion = true

                question.setAttribute('class', 'questions animate__animated animate__zoomIn')

                _dom.main.style.visibility = "hidden"
                question.style.visibility = "visible"

                setTimeout(hide_question, 1)
                setTimeout(show_question, _dom.questionLength)

                function show_question() {
                    stopAnimation()
                    question.style.visibility = "hidden"
                    clicked_element.innerText = "-"
                    clicked_element.style.pointerEvents = "none"
                }

                function hide_question() {
                    playAnimation()
                }
          }
        } catch(error) {
           // Do nothing
        }
  }
});
