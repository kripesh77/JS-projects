document.addEventListener('DOMContentLoaded', function(){
    let productList = document.getElementById('product-list');
    let addToCartBtn = document.getElementById('add-to-cart-btn')
    let emptyCart = document.getElementById('cart-items')
    let cartedContainer = document.getElementById('carted-container')
    let cartedItems = document.getElementById('carted-items')
    let totalAmount = document.getElementById('total-amount')

    let products = [
        {name:'Product 1', class:'add-to-cart-btn', src:'cat.jpg', price: 20.00},
        {name:'Product 2', class:'add-to-cart-btn', src:'cat.jpg', price: 5.00},
        {name:'Product 3', class:'add-to-cart-btn', src:'cat.jpg', price: 15.00},
        {name:'Product 4', class:'add-to-cart-btn', src:'cat.jpg', price: 25.00},
        {name:'Product 5', class:'add-to-cart-btn', src:'cat.jpg', price: 30.00},
        {name:'Product 6', class:'add-to-cart-btn', src:'cat.jpg', price: 59.00},
    ]

    products.forEach(element => {
        createProducts(element)
    });

    //creating products according to the above details
    function createProducts(element){
        let newProduct = document.createElement('li')
        newProduct.setAttribute('class','list-items')
        productList.appendChild(newProduct)

        let image = document.createElement('img')
        image.setAttribute('src',`./image/${element.src}`)
        image.setAttribute('alt',`${element.name}`)

        let name = document.createElement('p')
        name.innerText = `${element.name}`

        let price = document.createElement('p')
        price.innerHTML = `$<span>${element.price}</span></p>`

        let button = document.createElement('button')
        button.setAttribute('class',`${element.class}`)
        button.innerText = 'Add to Cart'

        newProduct.append(image, name, price, button)
    }

    //now adding to cart when we click the add-to-cart button
    //for that, lets introduce another array

    let cartArray = JSON.parse(localStorage.getItem('keys')) || []

    //it's used in addTotalPrice()
    let p = 0

    //iteratively creating cartArray
    cartArray.forEach((element) => {
        addCartItems(element.id, element.name, element.price, element.delBtnclass)
    })

    productList.addEventListener('click', function(e){
        if(e.target.matches('.add-to-cart-btn')){
            let itemName = e.target.parentElement.children[1].innerText
            let itemPrice = e.target.parentElement.children[2].innerText.replace('$','')
            
            let newCartProducts = {
                id: Date.now(),
                name: itemName,
                price: itemPrice,
                delBtnclass: 'delBtn'
            }
            cartArray.push(newCartProducts)
            
            //now adding cart items
            addCartItems(newCartProducts.id, newCartProducts.name, newCartProducts.price, newCartProducts.delBtnclass)
            
            localStorage.setItem('keys',JSON.stringify(cartArray))
            
            
        }
        
    })
    
    //function definition for addCartItems
    function addCartItems(id, name, price, delBtnClass){
        emptyCart.style.display = 'none'
        cartedContainer.classList.remove('hidden')
        let newCartItem = document.createElement('li')
        newCartItem.innerHTML = `${name}: <p>$${price}</p> <button id="${id}" class='delBtnClass'>Delete</button>`
        cartedItems.appendChild(newCartItem)
        addTotalPrice(Number(price))
    }

    function addTotalPrice(price){
        p = p + price
        totalAmount.innerText = p
    }


    //Now deleting listed cart items
    cartedItems.addEventListener('click', function(e){
        if(e.target.matches('.delBtnClass')){
            let childrenLength = e.target.parentElement.parentElement.children.length

            //extracting price of the cart item
            let itemPrice = Number(e.target.parentElement.childNodes[1].innerText.replace('$',''))
            
            //removing li from DOM
            e.target.parentElement.remove()

            cartArray = cartArray.filter((element) => {
                return e.target.id != element.id
            });

            subtractTotalPrice(itemPrice)
            
            
            if(childrenLength <= 1){
                emptyCart.style.display = 'block'
                cartedContainer.classList.add('hidden')
                localStorage.removeItem('keys')
            }
            else{
                //removing it from local storage
                localStorage.setItem('keys',JSON.stringify(cartArray))
            }

        }
    })

    //Subtracting function
    function subtractTotalPrice(itemPrice){
        p = p - itemPrice
        totalAmount.innerText = p
    }


})