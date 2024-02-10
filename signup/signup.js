// Assuming Firebase auth and db are properly initialized
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "../config.js";

window.signup =  async function () {
    const allInputs = document.getElementsByTagName('input');
    const fullName = allInputs[0].value;
    const email = allInputs[1].value;
    const password = allInputs[2].value;
    const confirmPassword = allInputs[3].value;

    if (!validateForm(fullName, email, password, confirmPassword)) {
        return;
    }

    try {
        // Creating user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(userCredential)
        
        // Adding user data to Firestore
        // await setDoc(doc(db, "users", "new-city-id"), data);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: fullName,
            email: email, // Include email in Firestore if needed
        });

        // console.log('User created with ID:', userDocRef.id);
        console.log('Sign Up Successful');
        console.log(userCredential);

        // Redirect only after successful signup
        window.location.href = '../login/index.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error creating user:', errorMessage);
        alert(errorMessage); // Display error message to the user
    }
}

function validateForm(fullName, email, password, confirmPassword) {
    if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all the input fields!');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Password does not match with confirm password!');
        return false;
    }

    return true;
}

// Assuming you have a button with ID 'submitBtn'
// const submitBtn = document.getElementById('submitBtn');
// if (submitBtn) {
    // submitBtn.addEventListener('click', sig/nup);
// } else {
    // console.error('Button with ID "submitBtn" not found in the document.');
// }
