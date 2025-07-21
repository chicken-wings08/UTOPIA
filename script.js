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
typeWriter();

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

fetch("https://script.google.com/macros/s/AKfycbyqFn9-wEljrdBMOTtZhbSlWlfi5PZGlLh-q85yi0H77XDEE6gykCpU2jHPcHEJBOM2wg/exec")
  .then(res => res.json())
  .then(data => {
    document.getElementById("visitor-count").textContent = data.visits;
  })
  .catch(() => {
    document.getElementById("visitor-count").textContent = "Error";
  });

function rain(){
  let amount = 50;
  let body = document.querySelector('body');

  // Clear old drops
  document.querySelectorAll('i.raindrop').forEach(drop => drop.remove());

  for (let i = 0; i < amount; i++) {
    let drop = document.createElement('i');
    drop.classList.add('raindrop'); // Add a class for easy cleanup

    let size = Math.random() * 2;
    let posX = Math.floor(Math.random() * window.innerWidth);
    let delay = Math.random() * -20;

    drop.style.width = 0.2 + size + 'px';
    drop.style.left = posX + 'px';
    drop.style.animationDelay = delay + 's';

    body.appendChild(drop);
  }
}

// Initial spawn
rain();

// Regenerate rain when the window is resized
window.addEventListener('resize', rain);
