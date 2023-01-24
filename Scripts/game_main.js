import {_dom} from '/Scripts/game_variables.js'

let cell
const game_table = document.createElement('table')
game_table.setAttribute('id', 'main_table')
game_table.setAttribute('class', 'main_table')
game_table.addEventListener('click', function(event) {
    let clicked_box = event.target
    if(event.target.hasAttribute('data-question')) {
        _dom.viewingQuestion = true
        _dom.answered_question = false

        let clicked_question = event.target.children[0]
        let question_timer = clicked_question.children[2].children[0]
        let choices = clicked_question.children[1]
        
        question_timer.setAttribute('id', "play-timer-animation")
        question_timer.style.animationDuration = _dom.questionLength/ 1000 + "s"

        _dom.main.style.visibility = "hidden"
        clicked_question.style.visibility = "visible"
        clicked_question.style.right = "0px"
        clicked_question.style.left = "0px"
        clicked_question.style.top = "0px"

        _dom.edit_mode_icon.style.cursor = "not-allowed"
        _dom.double_points_icon.style.cursor = "not-allowed"
        _dom.menu_button.style.cursor = "not-allowed"

        choices.addEventListener('click', function(event) {
            let clicked_answer = event.target
            if(clicked_answer.getAttribute('data-choices') === 'correct' && _dom.viewingQuestion === true) {
                _dom.answered_question = true
                stopAudio(_dom.corret_answer_sound)
                _dom.corret_answer_sound.play()
                exitQuestion()
            } else if(clicked_answer.getAttribute('data-choice') != 'correct') {
                _dom.answered_question = true
                stopAudio(_dom.times_up)
                _dom.times_up.play()
                exitQuestion()
            }
        })

        question_timer.addEventListener("animationend", function(event) {
            if(_dom.answered_question == false) {
                _dom.times_up.play()
                exitQuestion()
            }
        })
        function exitQuestion() {
            clicked_box.innerHTML = "-"
            _dom.main.style.visibility = "visible"
            clicked_box.setAttribute('data-used', 'true')

            _dom.viewingQuestion = false
            clicked_question.style.visibility 
            _dom.edit_mode_icon.style.cursor = "pointer"
            _dom.double_points_icon.style.cursor = "pointer"
            _dom.menu_button.style.cursor = "pointer"
        }
    }
})

for (let i = 0; i < 5; i++) {
    let rows = game_table.insertRow(i)
    rows.id = `${i}r${i}c`
    
    for(let y = 0; y < 5; y++) {

        cell = rows.insertCell(y)
        cell.id = `r${i}c${y}`
        cell.innerText = cell.id 
        cell.setAttribute('class', 'boxes')
        cell.setAttribute('data-question', 'box')

        const question = document.createElement('div')
        const question_p = document.createElement('p')
        const choices = document.createElement('div')
        const timer_container = document.createElement('div')
        const timer_bar = document.createElement('div')
        choices.id = `${cell.id}-ch`

        for(let k = 0; k < 4; k++) {
            const choices_option = document.createElement('p')
            choices_option.innerHTML = `${k}`   
            choices.setAttribute('data-choice', 'choice')
            choices.appendChild(choices_option)
        }

        timer_bar.setAttribute('class', "timer-bar")
        timer_container.setAttribute('class', "timer-container")
        choices.setAttribute('class', "choices")
        question_p.setAttribute('class', "question-color")
        question.setAttribute('class', "questions")

        timer_container.appendChild(timer_bar)
        question.appendChild(question_p)    
        question.appendChild(choices)
        question.appendChild(timer_container)
        cell.appendChild(question)

    }
} _dom.main.insertBefore(game_table, document.getElementById('player-info-table'))

let headers = game_table.insertRow(0)
headers.setAttribute('class', 'headers')
headers.id = "headers"
for(let i = 0; i < 5; i++) {
    headers.insertCell()
}

let questions = document.querySelectorAll('.questions')

questions.forEach((element, index) => {
    element.id = `q${index + 1}`
})

// fetch('./questions.json')
//     .then((response) => response.json())
//     .then((info) => {
//         for(let i = 0; i < info['headings'].length; i++) {
//             headers.children[i].innerHTML = info['headings'][i]
//         }

//         cells.forEach((element, index) => {
//             element.childNodes[0].textContent = info['questions'][index].value
//             element.childNodes[1].children[0].innerHTML = info['questions'][index]['question']
//         })
//         choices.forEach((element, index) => {
//             getRandomOptionSlot(element, index, 'answer', info)
//             getRandomOptionSlot(element, index, 'wrong_1', info)
//             getRandomOptionSlot(element, index, 'wrong_2', info)
//         })
//     })

function getRandomOptionSlot(element, index, option, json) {
    let pickedSlot = element.children[pickRadomElement(3)]
    let pickedValidSlot = false
    do {
        if(pickedSlot.hasAttribute('data-choices', 'correct') || pickedSlot.hasAttribute('data-choices', 'wrong_1')) {
            pickedSlot = element.children[pickRadomElement(3)]
        } else {
            pickedValidSlot = true
            pickedSlot.innerHTML = json['questions'][index][`${option}`]
            if(pickedSlot.innerHTML === "undefined") {
                pickedSlot.remove()
            }
            pickedSlot.setAttribute('data-choices', `${option}`)
        }
    }
    while (pickedValidSlot == false)
}

function pickRadomElement(max) {
    return Math.floor(Math.random() * max)
}

function stopAudio(audio) {
    audio.pause()
    audio.currentTime = 0
}
_dom.question_length_icon.innerHTML = ` ${_dom.questionLength / 1000}s `
