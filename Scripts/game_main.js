//var questionLength = 6000 | Default 6000 (six seconds)
let every_id = document.querySelectorAll('*[id]')
let every_class = document.querySelectorAll('*[class]')
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

window.addEventListener('click', function(event){
const clicked_element = document.getElementById(event.target.id)

    for (let i = 0; i < every_id.length; i++) {
        try {
            if(clicked_element.classList[1] == every_id[i].id) {
                const question_id = clicked_element.classList[1]
                const question = document.getElementById(question_id)

                // console.info("CURRENT QUESTION:", question_id)
                // console.log(_dom.doubleTimeCheatEnabled)
                _dom.viewingQuestion = true

                if(_dom.viewingQuestion == true) {
                    _dom.menu_button.style.cursor = "not-allowed"
                }

                question.setAttribute('class', 'questions animate__animated animate__zoomIn')
                // console.log(question.attributes)

                _dom.main.style.visibility = "hidden"
                question.style.visibility = "visible"

                setTimeout(hide_question, 1)
                setTimeout(show_question, _dom.questionLength)

                function show_question() {
                    let question_number = clicked_element.classList[1]
                    let question_val = clicked_element.classList[2]

                    stopAnimation()
                    question.style.visibility = "hidden"
                    clicked_element.innerText = "-"
                    clicked_element.style.pointerEvents = "none"
                    clicked_element.setAttribute('class', `boxes ${question_number} ${question_val} used`)
                    _dom.viewingQuestion = false
                    _dom.menu_button.style.cursor = "pointer"
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
