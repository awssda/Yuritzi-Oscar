import { auth } from './firebase-config.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Check authentication
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'index.html';
    }
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
});

// Load poems
const poems = [
    {
        title: "Mi Amor Por Ti",
        content: "En cada amanecer pienso en ti,\nEn cada estrella veo tu sonrisa,\nEres el amor que siempre soñé,\nLa razón de mi alegría."
    },
    {
        title: "Nuestro Amor",
        content: "Como el sol y la luna,\nAsí somos tú y yo,\nDiferentes pero perfectos,\nEn nuestra propia constelación."
    },
    {
        title: "Eternamente",
        content: "En tus ojos encuentro paz,\nEn tu sonrisa mi felicidad,\nEn tu amor mi hogar,\nEn ti, mi eternidad."
    },
    {
        title: "Juntos",
        content: "Cada día a tu lado es un regalo,\nCada momento un tesoro,\nCada sonrisa tuya ilumina mi mundo,\nY cada 'te amo' hace latir mi corazón."
    }
];

const poemsGrid = document.getElementById('poemsGrid');
poems.forEach(poem => {
    const poemCard = document.createElement('div');
    poemCard.className = 'card';
    poemCard.innerHTML = `
        <div class="card-info">
            <div>
                <h3 class="poem-title">${poem.title}</h3>
                <p class="poem-content">${poem.content}</p>
            </div>
        </div>
    `;
    poemsGrid.appendChild(poemCard);
});