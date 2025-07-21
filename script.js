const text = "Utopia";
const speed = 250; // typing speed
const deleteSpeed = 100; // backspace speed
const pause = 5000; // pause before deleting/typing
const pausedel = 1000; // pause before deleting/typing
const h1 = document.getElementById("typewriter");
let i = 0;
let isDeleting = false;

function typeWriter() {
  if (!isDeleting && i <= text.length) {
    h1.innerHTML = text.substring(0, i) + '<span class="caret">|</span>';
    i++;
    if (i > text.length) {
      setTimeout(() => { isDeleting = true; typeWriter(); }, pause);
    } else {
      setTimeout(typeWriter, speed);
    }
  } else if (isDeleting && i >= 0) {
    h1.innerHTML = text.substring(0, i) + '<span class="caret">|</span>';
    i--;
    if (i < 0) {
      isDeleting = false;
      setTimeout(typeWriter, pausedel);
    } else {
      setTimeout(typeWriter, deleteSpeed);
    }
  }
}

fetch('https://api.countapi.xyz/hit/utopia-website/utopia')
  .then(res => res.json())
  .then(data => {
    document.getElementById('view-counter').textContent = "Views: " + data.value;
});

window.addEventListener('click', function() {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
    }
});

typeWriter();