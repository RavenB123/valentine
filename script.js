const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainCard = document.getElementById('main-card');
const successPage = document.getElementById('success-page');
const backBtn = document.getElementById('back-btn');
const notebook = document.getElementById('notebook');
const scoreElement = document.getElementById('score');

let score = 0;

// 1. Balloon Hearts Logic
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 80 + 5 + 'vw';
    heart.style.top = '105vh';

    const duration = Math.random() * 4 + 8;
    heart.style.transition = `top ${duration}s linear, opacity 0.3s`;

    document.getElementById('heart-container').appendChild(heart);

    heart.addEventListener('mousedown', (e) => {
        score++;
        scoreElement.innerText = score;
        heart.style.transform = 'scale(1.6)';
        heart.style.opacity = '0';

        confetti({
            particleCount: 50,
            spread: 70,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ['#ff4d6d', '#ffccd5', '#ffffff']
        });
        setTimeout(() => { if (heart.parentNode) heart.remove(); }, 100);
    });

    setTimeout(() => { heart.style.top = '-20vh'; }, 100);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, duration * 1000);
}
setInterval(createHeart, 1000);

// 2. RUNAWAY NO BUTTON (Stays on screen)
noBtn.addEventListener('mouseover', () => {
    const padding = 30;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
});

// 3. Page Navigation
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successPage.classList.remove('hidden');
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
});

backBtn.addEventListener('click', () => {
    successPage.classList.add('hidden');
    mainCard.classList.remove('hidden');
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
});

// 4. Notebook Flip
document.getElementById('notebook-cover').addEventListener('click', () => {
    notebook.classList.toggle('open');
});