import {_dom} from '/Scripts/game_variables.js'


let p2s = document.getElementById("player2_score")
let p3s = document.getElementById("player3_score")

window.addEventListener('click', function(event) {
  let clicked_button = event.target.id



  if(clicked_button == 'add_p1') {
    let p1s = document.getElementById('player1_score')
    _dom.p1_score = +_dom.default_point_value + +_dom.p1_score
    p1s.innerText= _dom.p1_score
  } else if (clicked_button == 'add_p2') {
    let p2s = document.getElementById('player2_score')
    _dom.p2_score = +_dom.default_point_value + +_dom.p2_score
    p2s.innerText = _dom.p2_score
  } else if (clicked_button == 'add_p3') {
    let p3s = document.getElementById('player3_score')
    _dom.p3_score = +_dom.default_point_value + +_dom.p3_score
    p3s.innerText = _dom.p3_score
  } else if (clicked_button == 'add_p4') {
    _dom.p4_score = +_dom.default_point_value + +_dom.p4_score
    document.getElementById('player4_score').innerText = _dom.p4_score
  } else if (clicked_button == 'add_p5') {
    _dom.p5_score = +_dom.default_point_value + +_dom.p5_score
    document.getElementById('player5_score').innerText = _dom.p5_score
  } else if (clicked_button == 'add_p6') {
    _dom.p6_score = +_dom.default_point_value + +_dom.p6_score
    document.getElementById('player6_score').innerText = _dom.p6_score
  } else if (clicked_button == 'add_p7') {
    _dom.p7_score = +_dom.default_point_value + +_dom.p7_score
    document.getElementById('player7_score').innerText = _dom.p7_score
  }
})



window.addEventListener('click', function(event) {
  let clicked_button = event.target.id
  
  if(clicked_button == 'take_p1') {
    let p1s = document.getElementById('player1_score')
    _dom.p1_score -= _dom.default_point_value
    p1s.innerText = _dom.p1_score
  } else if (clicked_button == 'take_p2') {
    let p2s = document.getElementById('player2_score')
    _dom.p2_score -= _dom.default_point_value
    p2s.innerText = _dom.p2_score
  } else if (clicked_button == 'take_p3') {
    let p3s = document.getElementById('player3_score')
    _dom.p3_score  -= _dom.default_point_value
    p3s.innerHTML = _dom.p3_score
  } else if (clicked_button == 'take_p4') {
    _dom.p4_score  -= _dom.default_point_value
    document.getElementById('player4_score').innerText = _dom.p4_score
  } else if (clicked_button == 'take_p5') {
    _dom.p5_score  -= _dom.default_point_value
    document.getElementById('player5_score').innerText = _dom.p5_score
  } else if (clicked_button == 'take_p6') {
    _dom.p6_score  -= _dom.default_point_value
    document.getElementById('player6_score').innerText = _dom.p6_score
  } else if (clicked_button == 'take_p7') {
    _dom.p7_score  -= _dom.default_point_value
    document.getElementById('player7_score').innerText = _dom.p7_score
  } 

})
