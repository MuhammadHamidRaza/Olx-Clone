import { doc, collection, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db, getAds, searchInAds } from '../../config.js'

let userName; // Declare userName variable

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        renderAds()

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().name);
            const userName = docSnap.data().name
            const loginLink = document.getElementById('loginLink')
            loginLink.innerHTML = `Welcome ${userName}`


        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } else {
        // User is signed out
        // ...
        location.href = '../../login/index.html';

    }
});

window.logout = function () {
    signOut(auth).then(() => {
        console.log("sign out")
        window.location = '../login/index.html';
    }).catch((error) => {
        // An error happened.
    });
}
async function renderAds() {
    const ads = await getAds();
    const container = document.getElementById('card-container');

    for (var i = 0; i < ads.length; i++) {
        const ad = ads[i];

        const card = document.createElement('div');
        card.className = 'card';
        card.style.boxShadow = '0px 5px 5px 5px gray';
        card.style.background = 'lightcyan';
        card.style.width = '350px';
        card.style.borderRadius = '20px';
        card.onclick = function () {
            location.href = '../products/product.html?adId=' + ad.id;
        };

        const img = document.createElement('img');
        img.src = ad.image;
        img.style.width = '326px';
        img.className = 'images';
        img.style.height = '200px';

        const title = document.createElement('h3');
        title.innerHTML = ad.title;
        title.style.textAlign = 'center';
        title.style.background = 'white';

        const amount = document.createElement('h4');
        amount.innerHTML = `Rs. ${ad.amount}`;
        amount.style.textAlign = 'center';
        amount.style.background = 'red';

        card.append(img);
        card.append(title);
        card.append(amount);

        container.append(card);
    }
}
window.search = async function () {
    const inputValue = document.getElementById('input-Type').value
    console.log(inputValue)
        if (!inputValue) {
        renderAds()
    } else {
        const ads = await searchInAds(inputValue)
        const container = document.getElementById('card-container')
        container.innerHTML = ''
    
        for (var i = 0; i < ads.length; i++) {
            const ad = ads[i];
    
            const card = document.createElement('div');
            card.className = 'card';
            card.style.boxShadow = '0px 5px 5px 5px gray';
            card.style.background = 'lightcyan';
            card.style.width = '350px';
            card.style.borderRadius = '20px';
            card.onclick = function () {
                location.href = '../products/product.html?adId=' + ad.id;
            };
    
            const img = document.createElement('img');
            img.src = ad.image;
            img.style.width = '326px';
            img.className = 'images';
            img.style.height = '200px';
    
            const title = document.createElement('h3');
            title.innerHTML = ad.title;
            title.style.textAlign = 'center';
            title.style.background = 'white';
    
            const amount = document.createElement('h4');
            amount.innerHTML = `Rs. ${ad.amount}`;
            amount.style.textAlign = 'center';
            amount.style.background = 'red';
    
            card.append(img);
            card.append(title);
            card.append(amount);
    
            container.append(card);
        }

}
}
// window.search = async function () {
//     const input = document.getElementById('input-Type')
//     console.log(input.value)

//     if (!input.value) {
//         renderAds()
//     }
//     else {
//         const ads = await searchInAds(input.value)
//         const container = document.getElementById('card-container');

//         for (var i = 0; i < ads.length; i++) {
//             const ad = ads[i];

//             const card = document.createElement('div');
//             card.className = 'card';
//             card.style.boxShadow = '0px 5px 5px 5px gray';
//             card.style.background = 'lightcyan';
//             card.style.width = '350px';
//             card.style.borderRadius = '20px';
//             card.onclick = function () {
//                 location.href = '../products/product.html?adId=' + ad.id;
//             };

//             const img = document.createElement('img');
//             img.src = ad.image;
//             img.style.width = '326px';
//             img.className = 'images';
//             img.style.height = '200px';

//             const title = document.createElement('h3');
//             title.innerHTML = ad.title;
//             title.style.textAlign = 'center';
//             title.style.background = 'white';

//             const amount = document.createElement('h4');
//             amount.innerHTML = `Rs. ${ad.amount}`;
//             amount.style.textAlign = 'center';
//             amount.style.background = 'red';

//             card.append(img);
//             card.append(title);
//             card.append(amount);

//             container.append(card);
//         }
//     }

// }
