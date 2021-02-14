
       function fetchData(){
fetch("http://localhost:3000/api/teddies")
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
    
        
    let items =[ {
        _id: teddies._id,
        imageUrl: teddies.imageUrl,
        name: teddies.name,
        price: teddies.price,
        quantity: 0,
        colors: teddies.colors,
    }]
           
    // Ajout des produits dans le panier
    
    let carts = document.querySelectorAll('.card-add')
    
    for (let i=0; i < carts.length; i++ ) {
        carts[i].addEventListener('click', () => {
            cartNumbers(items[i]);
            totalCost(items[i])
        })
    }

    
    // Pour que les produits reste dans le panier meme apres le chargement
    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers')
    
        if(productNumbers) {
            document.querySelector('.cart span').textContent = productNumbers;
        }
    }
    
    //  Ajout de produit visible dans l'icone panier
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
     onLoadCartNumbers()
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
        
        //Affichage d'un message si le panier est vide
        if (document.getElementsByClassName('empty')[0].hasChildNodes()){
            alert('Merci!')
            // ... other code here
          }   
          else {
            alert("Votre panier est vide");
          }
    
    }

         
    
    // Calcul du coût total 
    function totalCost(product){
    
    let cartCost = localStorage.getItem('totalCost')
    //Conversion de string en number
    
        console.log("Le montant est de", cartCost)
        console.log(typeof cartCost)
        // console.log("Le prix du produit est", `${teddies.price / 100}.00 €`)
    
    
        if(cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        } else {
            localStorage.setItem("totalCost", product.price);
        }
    }
    
    //Affichage des information sur la page html
    function displayCart() {
        let cartItems = localStorage.getItem("Quantity");
        cartItems = JSON.parse(cartItems);
        let  productContainer = document.querySelector(".teddies");
        let cartCost = localStorage.getItem('totalCost')
        if(cartItems && productContainer) {
            productContainer.innerHTML = '';
            productContainer.innerHTML +=`
            <div class="template">
                <h4>Mon panier</h4>
                <div class="titleitems">
                <h6>Produit(s)</h6>
                <h6>Prix</h6>
                <h6>Quantité</h6>
                </div>`
            Object.values(cartItems).map(teddies => {
            productContainer.innerHTML += `
        
                <div class= "elements">
                <div class= "items">
               <span>${teddies.name}</span>
               <span>${teddies.price/100}.00€</span>
               <span>${teddies.quantity}</span>
                
               </div>
               <div>
               <button  id= "delete">Supprimer</button>
               </div>
               </div>
            `
                });
                productContainer.innerHTML +=`
                <div class= "basketTotalContainer">
                <h5 class= "basketTotalTitle">
                SOUS TOTAL
                </h5>
                <h5 class= "basketTotal"></h5>
                    ${cartCost/ 100}.00€
                </div>
                `
        

        //validation du formulaire
        const buttonForm = document.querySelector(".form");
        buttonForm.addEventListener('submit', e => {
            e.preventDefault();
            
            toSend();
        });

        // Recupération des objets products et contact 
        
        function toSend() {
            
              let  firstname = document.getElementById("firstname").value
              let  lastname = document.getElementById("lastname").value
              let  adress = document.getElementById("adress").value
              let  city = document.getElementById("city").value
              let  email = document.getElementById("email").value

            
            let products = [];
            if (sessionStorage.getItem('cartNumbers') !== null) {
                let idElement = JSON.parse(sessionStorage.getItem('cartNumbers'));
                
                idElement.forEach( product => {
                    products.push(product._id);
                })}

 // Assemblage des objets contact et product pour les envoyer dans le localstorage

                const orders = {
                    "contact": {
                      "firstName": firstname,
                      "lastName": lastname,
                      "address": adress,
                      "city": city,
                      "email": email
                    },
                    "products": products
                  }
              
          
        
        //Envoie de object vers la page de confirmation
           
        const post = {
            method: "POST",
            body: JSON.stringify(orders),
            headers: { "Content-Type": "application/json" },
          }
        
          fetch("http://localhost:3000/api/teddies/order", post)
            .catch(() => {alert(error)})
            .then((response) => response.json())
            .then((res) => {
              console.log(res)
              localStorage.setItem('orderId', JSON.stringify(res.orderId));
              console.log('orderId')
              localStorage.setItem('contact', JSON.stringify(res.contact));
              let cartCost = localStorage.getItem('totalCost')
              localStorage.setItem('total', cartCost);
              window.location.replace("./confirmation.html");

            })
         };
}}; displayCart()

})}; fetchData()