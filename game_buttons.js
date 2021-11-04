import {_dom} from '/Scripts/game_variables.js'

var p1s = document.getElementById("player1_score")
var p2s = document.getElementById("player2_score")
var p3s = document.getElementById("player3_score")


var p1_score = 0
var p2_score = 0 
var p3_score = 0
var p4_score = 0
var p5_score = 0
var p6_score = 0
var p7_score = 0


window.addEventListener('click', function(event) {
  var clicked_button = event.target.id
  //console.log(clicked_button) // Used for debug
  
  if(clicked_button == 'add_p1') {
    p1_score += 200
    p1s.innerText = p1_score
  } else if (clicked_button == 'add_p2') {
    p2_score += 200
    p2s.innerText = p2_score
  } else if (clicked_button == 'add_p3') {
    p3_score += 200
    p3s.innerText = p3_score
  } else if (clicked_button == 'add_p4') {
    p4_score  += 200
    document.getElementById('player4_score').innerText = p4_score
  } else if (clicked_button == 'add_p5') {
    p5_score  += 200
    document.getElementById('player5_score').innerText = p5_score
  } else if (clicked_button == 'add_p6') {
    p6_score  += 200
    document.getElementById('player6_score').innerText = p6_score
  } else if (clicked_button == 'add_p7') {
    p7_score  += 200
    document.getElementById('player7_score').innerText = p7_score
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
    p3_score  -= 200
    p3s.innerHTML = p3_score
  } else if (clicked_button == 'take_p4') {
    p4_score  -= 200
    document.getElementById('player4_score').innerText = p4_score
  } else if (clicked_button == 'take_p5') {
    p5_score  -= 200
    document.getElementById('player5_score').innerText = p5_score
  } else if (clicked_button == 'take_p6') {
    p6_score  -= 200
    document.getElementById('player6_score').innerText = p6_score
  } else if (clicked_button == 'take_p7') {
    p7_score  -= 200
    document.getElementById('player7_score').innerText = p7_score
  } 

})