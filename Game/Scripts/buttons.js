import {_dom} from '/Scripts/vars.js'

var p1s = document.getElementById("player1_score")
var p2s = document.getElementById("player2_score")
var p3s = document.getElementById("player3_score")

var p1_score = 0
var p2_score = 0 
var p3_score = 0


window.addEventListener('click', function(event) {
  var clicked_button = event.target.id
  
  if(clicked_button == 'add_p1') {
    p1_score += 200
    p1s.innerText = p1_score
  } else if (clicked_button == 'add_p2') {
    p2_score += 200
    p2s.innerText = p2_score
  } else if (clicked_button == 'add_p3') {
    p3_score += 200
    p3s.innerText = p3_score
  }

})



window.addEventListener('click', function(event) {
  var clicked_button = event.target.id
  
  if(clicked_button == 'take_p1') {
    p1_score -= 200
    p1s.innerText = p1_score
  } else if (clicked_button == 'take_p2') {
    p2_score -= 200
    p2s.innerText = p2_score
  } else if (clicked_button == 'take_p3') {
    p3_score -= 200
    p3s.innerText = p3_score
  }

})
