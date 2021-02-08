function productDisplay () {  
// Recuperation de l'id par l'URL

    const Url = new URLSearchParams (window.location.search);
    let id = Url.get("id")
    console.log(id);
    
    //Recuperation de l'API
 

    fetch("http://localhost:3000/api/teddies/" + id)
    .then(response => {
        console.log(response);
    if(!response.ok) {
        throw Error("ERROR");
    }
     return response.json();
    })
    .then(data => {
    console.log(data);


//Affichage des information sur la page html

let teddies = data

    let div = document.createElement("div")
    let gettd = document.getElementById("productdisplay")
    gettd.appendChild(div)
    div.classList.add('article')


        let _id = document.createElement('a')
        _id.href = teddies._id


        let image = document.createElement('img');
        let imageDiv = document.createElement('div')
        div.appendChild(imageDiv)
        image.src =  teddies.imageUrl;
        imageDiv.appendChild(image)
        imageDiv.classList.add('imageDiv')
        image.classList.add('teddyimage')


        let name = document.createElement('p')
        name.innerHTML = teddies.name;
        let descriptionDiv = document.createElement('div')
         descriptionDiv.classList.add('details')
        descriptionDiv.appendChild(name).style.fontWeight = "bold"
       div.appendChild(descriptionDiv)

        
       let description = document.createElement('p')
       description.innerHTML = teddies.description;
       descriptionDiv.appendChild(description)


       let price = document.createElement('p')
       price.innerHTML =  `${teddies.price / 100}.00€`;
       descriptionDiv.appendChild(price).style.fontWeight = "bold"



        let choice = document.createElement('div')
        choice.classList.add('colorChoice')
        let label = document.createElement('label')
        label.setAttribute('for', 'Colors')
        label.textContent="Choisir la couleur"
        label.classList.add('label')
        choice.appendChild(label)

        let select = document.createElement('select')
        select.setAttribute('name', 'Color')
        select.setAttribute('id', 'choice')
        choice.appendChild(select)


       teddies.colors.forEach(colors => {
        let option = document.createElement("option");
        option.value = colors;
        option.textContent = colors;
        
        descriptionDiv.appendChild(choice)
        select.appendChild(option);
           
       });

       let products =[ {
        _id: teddies._id,
        imageUrl: teddies.imageUrl,
        name: teddies.name,
        price: teddies.price,
        quantity: 0,
        colors: teddies.colors,
    }]

// Bouton panier
       let addCart = document.createElement('a')
       addCart.classList.add('add-cart')
       addCart.href = '#'
       
       div.appendChild(addCart)
       addCart.textContent = "Ajouter au panier"
       
// Ajout des produits dans le panier

let carts = document.querySelectorAll('.add-cart')

for (let i=0; i < carts.length; i++ ) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
// Pour que les produits reste dans le panier meme apres le chargement
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

//  Ajout de produit dans le panier
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product)
    
}

// Affichage du nombre de produit dans le local storage // Affichage de la totalité des descriptions du produit dans le local storage
function setItems(product){
    let cartItems = localStorage.getItem('Quantity');
    cartItems = JSON.parse(cartItems)
    console.log("Le produit est", cartItems);

   if(cartItems != null) {
    //    Prise en compte de l'ensemble des produits ajoutés au panier
       if(cartItems[product.name] == undefined ) {
           cartItems = {
               ...cartItems,
               [product.name]:product
           }
       }
       cartItems[product.name].quantity += 1;
   } else {
        product.quantity = 1;
    cartItems = {
        [product.name]: product
    }
   }
   
  
    localStorage.setItem("Quantity", JSON.stringify (cartItems))

}

// Calcul du coût total 
function totalCost(teddies){

let cartCost = localStorage.getItem('totalCost')
//Conversion de string en number

    console.log("Le montant est de", cartCost)
    console.log(typeof cartCost)
    // console.log("Le prix du produit est", `${teddies.price / 100}.00 €`)


    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + teddies.price)
    } else {
        localStorage.setItem("totalCost", teddies.price)
    }
}
    
onLoadCartNumbers()
}
 )};

 productDisplay()
 
