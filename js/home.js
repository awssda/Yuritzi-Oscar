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

// Load memories
const memories = [
    {
        url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46',
        caption: 'Nuestro primer día juntos'
    },
    {
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486',
        caption: 'Aquella tarde especial'
    },
    {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
        caption: 'Nuestro viaje inolvidable'
    },
    {
        url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
        caption: 'Momentos mágicos'
    }
];

const memoriesGrid = document.getElementById('memoriesGrid');
memories.forEach(memory => {
    const memoryCard = document.createElement('div');
    memoryCard.className = 'memory-card';
    memoryCard.innerHTML = `
        <img src="${memory.url}" alt="${memory.caption}" class="memory-image">
        <p class="memory-caption">${memory.caption}</p>
    `;
    memoriesGrid.appendChild(memoryCard);
});