import { getSingleAd , getUser,auth} from '../config.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {

        getAdDetail();




    } else {
        // User is signed out
        // ...
        location.href = '../login/index.html';

    }
});

async function getAdDetail() {
    const adId = location.search.slice(6)
    const ad = await getSingleAd(adId)
    const user = await getUser(ad.uid)
    console.log('user', user)


    const container = document.getElementById('container')

    const card = document.createElement('div')
    card.className = 'card'

    const img = document.createElement('img')
    img.src = ad.image
    img.style.width = '80%'
    img.style.marginLeft = '10%'
    img.style.marginTop = '5%'

    img.style.height = '100vh'
    img.style.boxShadow = '0px 0px 30px 30px'


    const title = document.createElement('h3')
    title.innerHTML = ad.title
    title.style.textAlign = 'center'
    title.style.backgroundColor = 'azure'

    const amount = document.createElement('h4')
    amount.innerHTML = `Rs. ${ad.amount}`
    amount.style.textAlign = 'center'
    amount.style.color = 'white'
    amount.style.backgroundColor = 'black'
    amount.style.width = '100px'


    var des = document.createElement('h2')
    des.innerHTML = "Description"
    des.style.width = '130px'
    des.style.backgroundColor = 'blue'
    des.style.color = 'white'

    



    const description = document.createElement('p')
    description.innerHTML = ad.description
    description.style.textAlign = 'center'
    description.style.fontSize = 'medium'
    description.style.background ='red'
    description.style.color ='white'


    const Name = `Product Is ${user.name}`
    // Name.style.textAlign = 'center'
    const Nh = document.createElement('h3')
    Nh.innerHTML = Name
    Nh.style.textAlign = 'center'



    card.append(img)
    card.append(title)
    card.append(amount)
    card.append(des)
    card.append(description)
    card.append(Nh)

    container.append(card)
}

// function getCartCount() {
//     const cartItems = JSON.parse(localStorage.getItem('cart'))
//     const cartNumber = document.getElementById('cart-number')
//     cartNumber.innerHTML = cartItems.length
// }

// getCartCount()
    // fetch(`https:dummyjson.com/products/${productId} `)
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log(res);
    //         const product = res
          
    //         const container = document.getElementById('container')
    //         const card = document.createElement('div')
    //         card.className = 'card'
            
    //         const img = document.createElement('img')
    //         img.src = product.thumbnail
    //         img.style.width = '100%'
    //         img.style.height = '40%'

            
    //         const title = document.createElement('h4')
    //         title.innerHTML = product.title
    //         title.style.fontSize = '50px'
    //         title.style.textAlign = 'center'

                
    //         const price = document.createElement('h1')
    //         price.innerHTML = `Price ${product.price}`
    //         price.style.border = '7px solid black'
    //         price.style.textAlign = 'center'

    //         const Tdescription = document.createElement('h5')
    //         Tdescription.innerHTML = "Description"
    //         Tdescription.style.border = '3px solid #9d8e8e54'
    //         Tdescription.style.textAlign = 'center'

    //         const button = document.createElement('img')
    //         button.src = 'https://t3.ftcdn.net/jpg/00/26/12/44/360_F_26124443_QQVqQWwQGQFqBQg9QACdpktxYQ7xIRkY.jpg'
    //         button.style.width ='200px'
    //         button.style.textAlign = 'center'
    //         button.style.paddingLeft='40%'
    //         button.onclick = () => {
    //             const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
    //             const cartItems = cartFromLocalStorage || []
    //             cartItems.push(res)
    //             localStorage.setItem('cart', JSON.stringify(cartItems))
    //         getCartCount()
    //         }
    //         const description = document.createElement('p')
    //         description.innerHTML = product.description
    //         Tdescription.append(description)
    //         card.append(title)
    //         card.append(img)
    //         card.append(button)

    //         card.append(price)
    //         card.append(Tdescription)

    //         container.append(card)

        // })
