// Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const inputs = player.querySelectorAll('.controls input');

// Toggle play/pause video
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// Update play/pause button text
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip video time
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and playback rate slider update
function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  // Update CSS variable for potential styling (optional)
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

  // Update video property based on input name
  video[this.name] = this.value;
}

// Update progress bar width
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub video on progress bar click or drag
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

inputs.forEach(input => {
  input.addEventListener('change', handleUpdate);
  input.addEventListener('mousemove', handleUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
