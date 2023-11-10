getData();

function getData() {
    const productId = window.location.search.split('=')[1]
    console.log(productId);
    fetch(`https:dummyjson.com/products/${productId} `)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const product = res
          
            const container = document.getElementById('container')
            const card = document.createElement('div')
            card.className = 'card'
            
            const img = document.createElement('img')
            img.src = product.thumbnail
            img.style.width = '100%'
            img.style.height = '40%'

            
            const title = document.createElement('h4')
            title.innerHTML = product.title
            title.style.fontSize = '50px'
            title.style.textAlign = 'center'

                
            const price = document.createElement('h1')
            price.innerHTML = `Price ${product.price}`
            price.style.border = '7px solid black'
            price.style.textAlign = 'center'

            const Tdescription = document.createElement('h5')
            Tdescription.innerHTML = "Description"
            Tdescription.style.border = '3px solid #9d8e8e54'
            Tdescription.style.textAlign = 'center'

            const button = document.createElement('img')
            button.src = 'https://t3.ftcdn.net/jpg/00/26/12/44/360_F_26124443_QQVqQWwQGQFqBQg9QACdpktxYQ7xIRkY.jpg'
            button.style.width ='200px'
            button.style.textAlign = 'center'
            button.style.paddingLeft='40%'
            button.onclick = () => {
                const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
                const cartItems = cartFromLocalStorage || []
                cartItems.push(res)
                localStorage.setItem('cart', JSON.stringify(cartItems))
            getCartCount()
            }
            const description = document.createElement('p')
            description.innerHTML = product.description
            Tdescription.append(description)
            card.append(title)
            card.append(img)
            card.append(button)

            card.append(price)
            card.append(Tdescription)

            container.append(card)




        })
}
function getCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart'))
    const cartNumber = document.getElementById('cart-number')
    cartNumber.innerHTML = cartItems.length
}

getCartCount()
