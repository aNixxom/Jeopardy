const _dom = {
  questionLength: 15000, //Default 6000
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
  question_length_icon: document.querySelector("#question-length-icon"),
  countdown_music: new Audio('/assets/countdown.mp3'),
  times_up: new Audio('/assets/times-up.mp3'),
  corret_answer_sound: new Audio('/assets/correct.mp3'),
  is_muted: false, //default false
  correct_answer: false,
  answered_question: false,
  default_point_value: 200, // default 200
  add_player: document.getElementById("add_player"),
  take_player: document.getElementById("take_player"),
  take_seconds: document.getElementById("take_seconds"),
  add_seconds: document.getElementById("add_seconds"),
  question_length_text: document.getElementById("question_length_text"),
  settings_menu: document.querySelector(".settings-menu"),
  doubleTimeSwitch: document.querySelector(".settings-toggle-button-one"),
  editModeSwitch: document.querySelector(".settings-toggle-button-two"),
  doublePointsSwitch: document.querySelector(".settings-toggle-button-three"),
  questionRefresh: document.querySelector('.settings-toggle-button-four'),
  editModeToggled: false, // Default false
  doublePointToggled: false, // Default flase
  isOpen: false, // Default false
  inputMenuOpen: false, // Default false
  double_time_cheat: document.getElementById("double-time-cheat"),
  current_stylesheet: 0,
  current_theme: document.getElementById("current-theme"),
  // Questions --------------------
  viewingQuestion: false, // Default false
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

let _themes = [
  "default",
  "light",
  "purple",
  "handwritten"
]

export { _dom, _pVars, _rows, _themes}
