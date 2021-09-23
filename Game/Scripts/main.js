var questionLength = 6000 // Default 6000 (six seconds)
var every_id = document.querySelectorAll('*[id]')
import {_dom} from '/Scripts/vars.js'

const stopAnimation = () => { // Progress Bar animation event (end)
    const progressBar = document.querySelectorAll(".timer-bar")
    for (var i = 0; i < progressBar.length;  i++) {
        progressBar[i].removeAttribute("id", 'play-timer-animation');
        _dom.main.style.visibility = "visible"
        
    }
}
const playAnimation = ()  => { // Progress Bar animation event (start)
    const progressBar = document.querySelectorAll(".timer-bar")
    for (var i = 0; i < progressBar.length;  i++) {
        progressBar[i].setAttribute("id", 'play-timer-animation');
    }
}

window.addEventListener('click', function(event){
const clicked_element = document.getElementById(event.target.id)
const staticQuestionWorth = parseInt(clicked_element.classList[2])
var qWorth = parseInt(clicked_element.classList[2])

//const clicked_element_nodetype = clicked_element.nodeType //should return 1
//const clicked_element_textcontent = clicked_element.textContent 
//console.log(clicked_element_nodetype, clicked_element.getAttributeNames()) 
//console.log(clicked_element_textcontent)


    for (let i = 0; i < every_id.length; i++) {
        try {
            if(clicked_element.classList[1] == every_id[i].id) {
                const question_id = clicked_element.classList[1]
                const question = document.getElementById(question_id)
                
                console.info("CURRENT QUESTION:", question_id)
                console.info("QUESTION WORTH:", qWorth)
              
                _dom.main.style.visibility = "hidden"
                question.style.visibility = "visible"
    
                playAnimation()
                setTimeout(show_question, questionLength)
    
                function show_question() {
                    stopAnimation()
                    question.style.visibility = "hidden"
                    clicked_element.style.color = "#010a78"
                    clicked_element.style.pointerEvents = "none"

                    take_p1.onclick = function () {takeScore()}
                    add_p1.onclick = function () {addScore()}

                    take_p2.onclick = function () {takeScore()}
                    add_p2.onclick = function () {addScore()} 

                    take_p2.onclick = function () {takeScore()}
                    add_p2.onclick = function () {addScore()}
                }
          }
        } catch(error) {
           // Do nothing
        }
  }
});
