const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainCard = document.getElementById('main-card');
const successPage = document.getElementById('success-page');
const backBtn = document.getElementById('back-btn');
const notebook = document.getElementById('notebook');
const scoreElement = document.getElementById('score');

let score = 0;

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 85 + 5 + 'vw';
    heart.style.top = '105vh';
    const duration = Math.random() * 3 + 7;
    heart.style.transition = `top ${duration}s linear, opacity 0.3s`;
    document.getElementById('heart-container').appendChild(heart);

    const pop = (e) => {
        score++;
        scoreElement.innerText = score;
        heart.style.opacity = '0';
        const xPos = e.clientX || (e.touches && e.touches[0].clientX);
        const yPos = e.clientY || (e.touches && e.touches[0].clientY);
        confetti({
            particleCount: 30,
            origin: { x: xPos / window.innerWidth, y: yPos / window.innerHeight }
        });
        setTimeout(() => heart.remove(), 100);
    };

    heart.addEventListener('mousedown', pop);
    heart.addEventListener('touchstart', (e) => { e.preventDefault(); pop(e); });
    setTimeout(() => { heart.style.top = '-20vh'; }, 100);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, duration * 1000);
}
setInterval(createHeart, 1200);

const moveButton = () => {
    const padding = 30;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = "1000";
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successPage.classList.remove('hidden');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
});

backBtn.addEventListener('click', () => {
    successPage.classList.add('hidden');
    mainCard.classList.remove('hidden');
    noBtn.style.position = 'relative';
    noBtn.style.left = '0';
    noBtn.style.top = '0';
});

document.getElementById('notebook-cover').addEventListener('click', () => {
    notebook.classList.toggle('open');
});
