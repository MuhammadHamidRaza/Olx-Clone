// Import necessary Firebase modules
import { collection, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "../config.js";


// Define userName and initialize it as an empty string
let userName

// Assign the login function to window.login
window.login = async function () {
    // Get email and password from input fields
    const allinputs = document.getElementsByTagName('input');
    const email = allinputs[0].value;
    const password = allinputs[1].value;

    // Validate email and password
    if (email === '') {
        alert('Please enter the email!');
        return;
    }
    if (password === '') {
        alert('Please enter the password!');
        return;
    }

    if (password.length < 8) {
        alert('Please enter a password with a minimum of 8 characters!');
        return;
    }

    try {
        // Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed in successfully!", user.uid);

        // Fetch all user documents from the "users" collection
        const querySnapshot = await getDocs(collection(db, "users"));

        // Iterate through the documents and log their IDs and data
        const doc = querySnapshot.docs[0];

        // You can also fetch and log the data of each user
        const userDoc = await getDoc(doc.ref);

        if (userDoc.exists()) {
            // Access the name field
            userName = userDoc.data().name
            console.log("User name:", userName);

            // Log the entire user document for debugging
            console.log("User document:", userDoc.data().name);

            // Redirect after setting userName
            window.location = '../Dashboard/index.html';
        } else {
            console.log("No user data found for this document.");
        }
    } catch (error) {
        // Handle errors during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorMessage);
        alert(errorMessage);
    }
};
export{
    userName
}