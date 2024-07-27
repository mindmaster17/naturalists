// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        // Sign in the user
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        
        // On successful login, you can save user info to the database or redirect
        const user = userCredential.user;
        document.getElementById('error-message').textContent = '';

        // Example of saving user data to the database
        await database.ref('users/' + user.uid).set({
            name: name,
            email: user.email,
            phone: phone,
            lastLogin: new Date().toString()
        });

        alert('Login successful!');
        // Redirect to another page or perform any action
        // window.location.href = 'dashboard.html';
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
    }
});
