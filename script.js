fetch('https://api.countapi.xyz/hit/utopia-website/utopia')
  .then(res => res.json())
  .then(data => {
    const viewCounter = document.getElementById('visitor-count');
    if (viewCounter) {
        viewCounter.textContent = data.value;
    }
});

window.addEventListener('click', function() {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play().catch(() => {});
    }
});

fetch("https://script.google.com/macros/s/AKfycbyqFn9-wEljrdBMOTtZhbSlWlfi5PZGlLh-q85yi0H77XDEE6gykCpU2jHPcHEJBOM2wg/exec")
  .then(res => res.json())
  .then(data => {
    const visitorCount = document.getElementById("visitor-count");
    if(visitorCount) {
        visitorCount.textContent = data.visits;
    }
  })
  .catch(() => {
    const visitorCount = document.getElementById("visitor-count");
    if(visitorCount) {
        visitorCount.textContent = "Error";
    }
  });

function rain(){
  let amount = 50;
  let body = document.querySelector('body');
  document.querySelectorAll('i.raindrop').forEach(drop => drop.remove());
  for (let i = 0; i < amount; i++) {
    let drop = document.createElement('i');
    drop.classList.add('raindrop');
    let size = Math.random() * 2;
    let posX = Math.floor(Math.random() * window.innerWidth);
    let delay = Math.random() * -20;
    drop.style.width = 0.2 + size + 'px';
    drop.style.left = posX + 'px';
    drop.style.animationDelay = delay + 's';
    body.appendChild(drop);
  }
}
rain();
window.addEventListener('resize', rain);

// --- Card & Typewriter Logic ---

const text = " Utopia";
const speed = 250;
const deleteSpeed = 100;
const pause = 5000;
const pausedel = 1000;
let typeI = 0;
let isDeleting = false;
let typewriterTimeout;

function typeWriter() {
    const h1 = document.querySelector('#card-1.active h1');
    if (!h1) {
        clearTimeout(typewriterTimeout);
        return;
    }

    const currentText = text;
    if (isDeleting) {
        if (typeI > 0) {
            h1.innerHTML = currentText.substring(0, typeI - 1) + '<span class="caret">|</span>';
            typeI--;
            typewriterTimeout = setTimeout(typeWriter, deleteSpeed);
        } else {
            isDeleting = false;
            typewriterTimeout = setTimeout(typeWriter, pausedel);
        }
    } else {
        if (typeI <= currentText.length) {
            h1.innerHTML = currentText.substring(0, typeI + 1) + '<span class="caret">|</span>';
            typeI++;
            typewriterTimeout = setTimeout(typeWriter, speed);
        } else {
            isDeleting = true;
            typewriterTimeout = setTimeout(typeWriter, pause);
        }
    }
}

typeWriter();

let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');
let isAnimating = false;

function showCard(index) {
    clearTimeout(typewriterTimeout);
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
            if (card.id === 'card-1') {
                typeI = 0;
                isDeleting = false;
                setTimeout(typeWriter, 800); // Delay to sync with rotation
            }
        } else {
            card.classList.remove('active');
        }
    });
}

document.getElementById('next-card').addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    const newIndex = (currentCardIndex + 1) % cards.length;
    showCard(newIndex);
    currentCardIndex = newIndex;
    setTimeout(() => isAnimating = false, 800);
});

document.getElementById('previous-card').addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    const newIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(newIndex);
    currentCardIndex = newIndex;
    setTimeout(() => isAnimating = false, 800);
});

// Initial card load
showCard(currentCardIndex);
