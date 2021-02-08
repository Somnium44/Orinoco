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

const html = data.map(teddies => {
    return `
    
    <div class="card" style="width: 20rem;">
    <div class="">
  <img src="${teddies.imageUrl}" class="card-img-top" alt="${teddies.name}">
  <div class="card-body">
    <h5 class="card-title">${teddies.name}</h5>
    <p class="card-text">${teddies.description}</p>
    <p>${teddies.price / 100}.00 €</p>
    <a href="produit.html?id=${teddies._id}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>
    `
}).join('')

document.getElementById('td').insertAdjacentHTML("afterBegin", html);
 })
 .catch(error => {
console.log(error)
 });
}

fetchData();

