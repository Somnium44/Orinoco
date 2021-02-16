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
    
// Pour que les produits reste dans le panier meme apres le chargement
    function onLoadCartNumbers(){
        let productNumbers = localStorage.getItem('cartNumbers')
    
        if(productNumbers) {
          document.querySelector('.cart span').textContent = productNumbers;
        }
    }
 onLoadCartNumbers()
    
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
               <button  id= "delete"><i class="fas fa-times"></i></button>
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