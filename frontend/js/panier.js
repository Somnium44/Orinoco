
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
    
    
    function displayCart() {
        let cartItems = localStorage.getItem("Quantity");
        cartItems = JSON.parse(cartItems);
        let  productContainer = document.querySelector(".teddies");
        let contains = document.querySelector(".contains");
        let cartCost = localStorage.getItem('totalCost')
        console.log(cartItems);
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
        
          

                <div class= "items">
               <span>${teddies.name}</span>
               <span>${teddies.price/100}.00€</span>
               <span>${teddies.quantity}</span>
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

        contains.innerHTML +=`
        <div #form>
        <h4>Adresse de livraison</h4>
        <form class="row g-3 form" action="post" type="submit"">
  <div class="col-md-4">
    <label for="validationServer01" class="form-label">Nom</label>
    <input type="text" class="form-control is-valid" id="lastname" name="lastname" value="" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationServer02" class="form-label">Prénom</label>
    <input type="text" class="form-control is-valid" id="firstname" name="firtname" value="" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
 
  <div class="col-md-6">
    <label for="validationServer03" class="form-label">Ville</label>
    <input type="text" class="form-control is-invalid" id="city" name="city" aria-describedby="validationServer03Feedback" required>
    <div id="validationServer03Feedback" class="invalid-feedback">
    Oups ! Vous devez saisir votre ville ici.
    </div>
  </div>
  
  <div class="col-md-3">
    <label for="validationServer05" class="form-label">Code postal</label>
    <input type="text" class="form-control is-invalid" id="adress" name="address" aria-describedby="validationServer05Feedback" required>
    <div id="validationServer05Feedback" class="invalid-feedback">
    Oups ! Vous devez saisir votre code postal ici
    </div>
  </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email">
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
      <div id="invalidCheck3Feedback" class="reduce invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div class="col-12">
    <button id="btn" class="btn btn-primary" type="submit">Paiement</button>
  </div>
  
</form>
        </div>
        
        `
        //validation du formulaire
        const buttonForm = document.querySelector(".form");
        buttonForm.addEventListener('submit', e => {
            e.preventDefault();
            form();
        });

        // Recupération des objets products et contact 
        
        function form() {
            let contact = {
               firstName: document.getElementById("firstname").value,
                lastName: document.getElementById("lastname").value,
                adress: document.getElementById("adress").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            };
        
            let products = [];
            if (sessionStorage.getItem('cartNumbers') !== null) {
                let idElement = JSON.parse(sessionStorage.getItem('cartNumbers'));
                
                idElement.forEach( product => {
                    products.push(product._id);
                })
            }
            // Assemblage des objets contact et product pour les envoyer dans le localstorage
            
            let object = JSON.stringify({
                contact, products
            })
            orders(object);
        };
        
        //Envoie de object vers la page de confirmation
           
        function orders(object) {
        
            fetch("http://localhost:3000/api/teddies/order", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: object
            })
            .then(res => response.json())
            // .then(response => console.log(response.orderId))
            .then(res => 
                localStorage.setItem('orderID', response.orderId))
               // localStorage.setItem('contact',response.contact);
               
                //let cartCost = localStorage.getItem('totalCost')
               // localStorage.setItem('Total', JSON.stringify(cartCost));
               

            

            .catch((e) => {
                displayError();
                console.log(e);
            })
            window.location.replace("./confirmation.html");
           
        } 
        
}
    }
    
    onLoadCartNumbers()
    displayCart()

}

    )
         };
    
     fetchData()