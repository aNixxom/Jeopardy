const _dom = {
  questionLength: 6000, //Default 6000
  //  Settings --------------------
  colorTheme: "default", // Default color (light, dark)
  loadedGame: false, // Defult false
  editMode: document.getElementById('n-bar'),
  caretBackOutline: document.getElementsByName("caret-back-outline"),
  main: document.getElementById("main"),
  menu_button: document.getElementById("menu-button"),
  mute_button: document.getElementById("mute-button"),
  unmute_button: document.getElementById("unmute-button"),
  double_time_icon: document.getElementById("double-time-icon"),
  edit_mode_icon: document.getElementById("eidt-mode-icon"),
  double_points_icon: document.getElementById("double-points-icon"),
  double_time_icon: document.getElementById("double-time-icon"),
  countdown_music: new Audio('/assets/countdown.mp3'),
  times_up: new Audio('/assets/times-up.mp3'),
  corret_answer_sound: new Audio('/assets/correct.mp3'),
  is_muted: false, //default false
  correct_answer: false,
  answered_question: false,
  default_point_value: 200, // default 200
  add_player: document.getElementById("add_player"),
  take_player: document.getElementById("take_player"),
  settings_menu: document.querySelector(".settings-menu"),
  doubleTimeSwitch: document.querySelector(".settings-toggle-button-one"),
  editModeSwitch: document.querySelector(".settings-toggle-button-two"),
  doublePointsSwitch: document.querySelector(".settings-toggle-button-three"),
  questionRefresh: document.querySelector('.settings-toggle-button-four'),
  doubleTimeCheatEnabled: false, // Default false
  editModeToggled: false, // Default false
  doublePointToggled: false, // Default flase
  isOpen: false, // Default false
  inputMenuOpen: false, // Default false
  double_time_cheat: document.getElementById("double-time-cheat"),
  // Questions --------------------
  viewingQuestion: false, // Default false
  q1: document.getElementById("q1"),
  q2: document.getElementById("q2"),
  q3: document.getElementById("q3"),
  q4: document.getElementById("q4"),
  q5: document.getElementById("q5"),
  q6: document.getElementById("q6"),
  q7: document.getElementById("q7"),
  q8: document.getElementById("q8"),
  q9: document.getElementById("q9"),
  q10: document.getElementById("q10"),
  q11: document.getElementById("q11"),
  q12: document.getElementById("q12"),
  q13: document.getElementById("q13"),
  q14: document.getElementById("q14"),
  q15: document.getElementById("q15"),
  q16: document.getElementById("q16"),
  q17: document.getElementById("q17"),
  q18: document.getElementById("q18"),
  q19: document.getElementById("q19"),
  q20: document.getElementById("q20"),
  // Click Event objects --------- (First Row ($200))
  r1c1: document.getElementById("r1c1"), //q1
  r1c2: document.getElementById("r1c2"),
  r1c3: document.getElementById("r1c3"),
  r1c4: document.getElementById("r1c4"),
  r1c1ra: document.getElementById('q1_correct'),
  r1c2ra: document.getElementById('q2_correct'),
  r1c3ra: document.getElementById('q3_correct'),
  r1c4ra: document.getElementById('q4_correct'),
  // Click Event objects --------- (Second Row ($400))
  r2c1: document.getElementById("r2c1"), //q2
  r2c2: document.getElementById("r2c2"),
  r2c3: document.getElementById("r2c3"),
  r2c4: document.getElementById("r2c4"),
  // Click Evnet objects ---------- (Third Row ($600))
  r3c1: document.getElementById("r3c1"), //q3
  r3c2: document.getElementById("r3c2"),
  r3c3: document.getElementById("r3c3"),
  r3c4: document.getElementById("r3c4"),
  // Click Evnet objects ---------- (Fourth Row ($800))
  r4c1: document.getElementById("r4c1"), //q4
  r4c2: document.getElementById("r4c2"),
  r4c3: document.getElementById("r4c3"),
  r4c4: document.getElementById("r4c4"),
  // Click Evnet objects ---------- (Fith Row ($1000))
  r5c1: document.getElementById("r5c1"), //q5
  r5c2: document.getElementById("r5c2"),
  r5c3: document.getElementById("r5c3"),
  r5c4: document.getElementById("r5c4"),
  // Take Player Score
  take_p1: document.getElementById("take_p1"),
  take_p2: document.getElementById("take_p2"),
  take_p3: document.getElementById("take_p3"),
  // Add Player Scores
  add_p1: document.getElementById("add_p1"),
  add_p2: document.getElementById("add_p2"),
  add_p3: document.getElementById("add_p3"),
  // Player numbers
  p1_score: 0,
  p2_score: 0,
  p3_score: 0,
  p4_score: 0,
  p5_score: 0,
  p6_score: 0,
  p7_score: 0,
}

const _pVars = {
  starting_players: 3,
  players_added: 0,
  total_players: 0
}

const _rows = {
  r1c1: document.getElementById("r1c1"), //q1
  r1c2: document.getElementById("r1c2"),
  r1c3: document.getElementById("r1c3"),
  r1c4: document.getElementById("r1c4"),

  // Click Event objects --------- (Second Row ($400))
  r2c1: document.getElementById("r2c1"), //q2
  r2c2: document.getElementById("r2c2"),
  r2c3: document.getElementById("r2c3"),
  r2c4: document.getElementById("r2c4"),
  // Click Evnet objects ---------- (Third Row ($600))
  r3c1: document.getElementById("r3c1"), //q3
  r3c2: document.getElementById("r3c2"),
  r3c3: document.getElementById("r3c3"),
  r3c4: document.getElementById("r3c4"),
  // Click Evnet objects ---------- (Fourth Row ($800))
  r4c1: document.getElementById("r4c1"), //q4
  r4c2: document.getElementById("r4c2"),
  r4c3: document.getElementById("r4c3"),
  r4c4: document.getElementById("r4c4"),
  // Click Evnet objects ---------- (Fith Row ($1000))
  r5c1: document.getElementById("r5c1"), //q5
  r5c2: document.getElementById("r5c2"),
  r5c3: document.getElementById("r5c3"),
  r5c4: document.getElementById("r5c4"),
}

export { _dom, _pVars, _rows}
