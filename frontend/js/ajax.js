//Recuperation de l'API

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

//Recuperation des données de l'API
let  td = document.querySelector("#td");
const html = data.map(teddies => {
    td.innerHTML += `
  <div class="card" style="width: 22rem; margin:10px; margin-top:3%;">
    <div class="col">
    <img src="${teddies.imageUrl}" class="card-img-top product-img" alt="${teddies.name}">
      <div class="card-body">
          <h5 class="card-title">${teddies.name}</h5>
          <p class="card-text">${teddies.description}</p>
          <p>${teddies.price / 100}.00 €</p>
          <a href="produit.html?id=${teddies._id}" class="btn btn-primary">Découvrir</a>
      </div>
  </div>
</div>
    `
})
 })
 


 .catch(error => {
console.log(error)
 });


}

fetchData();

