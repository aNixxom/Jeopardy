import {_dom} from '/Scripts/game_variables.js'

window.addEventListener('click', function(event) {
  let clicked_button = event.target.id

  try {
    if(event.target.classList[1].includes('q')) _dom.default_point_value = event.target.classList[2]
  } catch(error) {
    // Do nothing
  }
  
  for(let i = 0; i < 8; i++) {
    let pxs = document.getElementById(`player${i}_score`)
    if(clicked_button == `add_p${i}`) {
      _dom[`p${i}_score`] = +_dom.default_point_value + +_dom[`p${i}_score`]
      pxs.innerHTML = _dom[`p${i}_score`]
    }
  } 

  for(let i = 0; i < 8; i++) {
    let pxs = document.getElementById(`player${i}_score`)
    if(clicked_button == `take_p${i}`) {
      _dom[`p${i}_score`] -= _dom.default_point_value
      pxs.innerHTML = _dom[`p${i}_score`]
    }
  } 

})