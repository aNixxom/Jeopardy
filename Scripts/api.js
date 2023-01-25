import {_dom} from '/Scripts/game_variables.js'

let headers = document.getElementById('headers')
const fs = require('fs')


let used_categories = []
let categories = [
  'history',
  'music',
  'general_knowledge',
  'science',
  'film_and_tv',
  'food_and_drink',
  'sports',
  'geography',
  'arts_and_literature',
  'society_and_culture'
]

let cellIds = [
  'r0c0',
  'r1c0',
  'r2c0',
  'r3c0',
  'r4c0',
  'r0c1',
  'r1c1',
  'r2c1',
  'r3c1',
  'r4c1',
  'r0c2',
  'r1c2',
  'r2c2',
  'r3c2',
  'r4c2',
  'r0c3',
  'r1c3',
  'r2c3',
  'r3c3',
  'r4c3',
  'r0c4',
  'r1c4',
  'r2c4',
  'r3c4',
  'r4c4',
]

setTimeout(() => {
  test(0, 5)
  test(5, 10)
  test(10, 15)
  test(10, 15)
  test(15, 20)
  test(20, 25)
}, 2000)

function test(x, y) {
  for(let i = x; i < y; i++) {
    let element = document.getElementById(cellIds[i])
    console.log(element.childNodes[1].children[0].innerHTML, element)
  }
}

for(let column = 0; column <= 5; column++) {
  fillCategories(column)
}
console.table(used_categories)

for(let column = 0, pos1 = 0, pos2  = 5;  column < 5; pos1 += 5, pos2 += 5, column++) {
  fillTable(column, pos1, pos2)
}

function fillTable(cat, pos1, pos2) {
  setTimeout(() => {
    fetch(`https://the-trivia-api.com/api/questions?categories=${used_categories[cat]}&limit=5&difficulty=medium`, {
      headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((info) => {
        const prettyInfo = JSON.stringify(info, 0, 4)
        fs.appendFile('/response.json', prettyInfo, error => {
          if(error) console.log(error)
        })
        console.log(JSON.stringify(info, 0, 4))
        fillQuestions(pos1, pos2, info)
        fillAnswers(pos1, pos2, info)
      })
  }, 500)
}

function fillCategories(col) {
  let catLength = categories.length
  let pickedCategory = categories[pickRandomNumber(catLength)]

  fetch(`https://the-trivia-api.com/api/questions?categories=${pickedCategory}&limit=5&difficulty=easy`, {
  headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((info) => {
    for(let i = 0; i < 3; i++) {
        headers.children[col].innerHTML = info[i].category
        headers.children[col].setAttribute("data-category", pickedCategory)
    }
  })
  categories.splice(categories.indexOf(pickedCategory), 1)
  used_categories.push(pickedCategory)
}

function fillQuestions(x, y, json) {
  for(let i = 0, j = x; j < y; i++, j++) {
    let element = document.getElementById(cellIds[j])
    element.childNodes[1].children[0].innerHTML = json[i].question
  }
}

function fillAnswers(x, y, json) {
  for(let i=0, j = x; j < y; i++, j++) {
    let element = document.getElementById(`${cellIds[j]}-ch`)
    getRandomOptionSlot(element, 'correct', json[i].correctAnswer)
    getRandomOptionSlot(element, 'wrong_1', json[i].incorrectAnswers[0])
    getRandomOptionSlot(element, 'wrong_2', json[i].incorrectAnswers[1])
    getRandomOptionSlot(element, 'wrong_3', json[i].incorrectAnswers[2])
  }
}

function getRandomOptionSlot(element, option, json) {
  let pickedSlot = element.children[pickRandomNumber(4)]
  let pickedValidSlot = false
  do {
      if(pickedSlot.hasAttribute('data-choices', 'wrong_1') || pickedSlot.hasAttribute('data-choices', 'wrong_2') || pickedSlot.hasAttribute('data-choices', 'wrong_3') || pickedSlot.hasAttribute('data-choices', 'correct')) {
        pickedSlot = element.children[pickRandomNumber(4)] 
      } else {
        pickedValidSlot = true
        pickedSlot.innerHTML = json

      if(pickedSlot.innerHTML === "undefined") {
        pickedSlot.remove()
      }
      pickedSlot.setAttribute('data-choices', `${option}`)
      }
  }
  while (pickedValidSlot == false)
}

function pickRandomNumber(max) {
  return  Math.floor(Math.random() * max)
}