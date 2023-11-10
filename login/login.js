function login() {
    const allinputs = document.getElementsByTagName('input');
    const email = allinputs[0];
    const password = allinputs[1];

    if (email.value === '') {
        alert('Please enter the email!');
        return;
    }
    if (password.value ==='') {
        alert('Please enter the password!');
        return;
    }

    if (password.value.length < 8) {
        alert('Please enter a password with a minimum of 8 characters!');
        return;
    }
    

    const users = JSON.parse(localStorage.getItem('users'));
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.value === '' || users[i].password.value === '') {
            alert('please fill all the inputs first!');
        }
        else if (users[i].email === email.value && users[i].password === password.value) {
            alert('Logged in successfully!');

            localStorage.setItem('loggedInUser', users[i].fullname);

            // Disable or hide the login link after successful login
            const loginLink = document.getElementById('loginLink');
            if (loginLink) {
                loginLink.disabled = true; // Disable the link
            }

            window.location.href = '../Dashboard/index.html'; // Redirect to the home page
            found = true;
            break;
        }
    }

    if (!found) {
        alert('Invalid Email/Password');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        var loginlink = document.getElementById('loginlink');
        loginlink.innerText = `Welcome,   ${loggedInUser}`
    }
});

// for (var i = 0; i < allinputs.length; i++) {
//     allinputs[i].value = '';
// }
