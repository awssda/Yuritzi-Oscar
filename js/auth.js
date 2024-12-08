import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { auth } from './firebase-config.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Check user email to identify if it's Oscar or Yuritzi
        if (user.email === 'oscar@amor.com' || user.email === 'yuritzi@amor.com') {
            window.location.href = 'home.html';
        } else {
            alert('Usuario no autorizado');
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
});