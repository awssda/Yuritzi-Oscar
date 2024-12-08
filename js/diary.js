import { auth, db } from './firebase-config.js';
import { collection, addDoc, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

let currentUser = null;

// Check authentication
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'index.html';
    } else {
        currentUser = user;
        loadDiaryEntries();
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

// Handle diary form submission
const diaryForm = document.getElementById('diaryForm');
diaryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const entryContent = document.getElementById('diaryEntry').value.trim();
    if (!entryContent) return;

    try {
        await addDoc(collection(db, 'diary-entries'), {
            content: entryContent,
            author: currentUser.email,
            authorName: currentUser.email === 'oscar@amor.com' ? 'Oscar' : 'Yuritzi',
            createdAt: new Date()
        });

        document.getElementById('diaryEntry').value = '';
    } catch (error) {
        console.error('Error al guardar la entrada:', error);
        alert('Error al guardar la entrada. Por favor, intenta de nuevo.');
    }
});

// Load diary entries
function loadDiaryEntries() {
    const entriesDiv = document.getElementById('diaryEntries');
    const q = query(collection(db, 'diary-entries'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
        entriesDiv.innerHTML = '';
        snapshot.forEach((doc) => {
            const entry = doc.data();
            const date = entry.createdAt.toDate();
            const formattedDate = date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const entryElement = document.createElement('div');
            entryElement.className = 'diary-entry';
            entryElement.innerHTML = `
                <div class="entry-meta">
                    <span>${entry.authorName}</span>
                    <span>${formattedDate}</span>
                </div>
                <div class="entry-content">${entry.content}</div>
            `;
            entriesDiv.appendChild(entryElement);
        });
    });
}