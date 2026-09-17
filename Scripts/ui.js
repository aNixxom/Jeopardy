let messageTimer;
export function systemMessage(message) {
  const popup = document.getElementById('popup');
  clearTimeout(messageTimer);
  popup.textContent = message;
  popup.classList.add('show');
  messageTimer = setTimeout(() => popup.classList.remove('show'), 5000);
}

export function stopAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
}

export function playAudio(audio) {
  stopAudio(audio);
  // Browser autoplay restrictions or a missing sound must never interrupt a game.
  audio.play().catch(() => {});
}
