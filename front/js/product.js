const id = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url

console.log(id);
    fetch("http://localhost:3000/api/products" + "/" + id)
    .then((res) => res.json())
    .then(data =>{
        console.log(data);
        document.querySelector(".item").innerHTML =`
        <article>
        <div class="item__img">
          <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="item__content">

          <div class="item__content__titlePrice">
            <h1 id="title"></h1>
            <p>Prix : <span id="">${data.price}</span>€</p>
          </div>

          <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description">${data.description}</p>
          </div>

          <div class="item__content__settings">
            <div class="item__content__settings__color">
              <label for="color-select">Choisir une couleur :</label>
              <select name="color-select" id="colors">
              <option>--SVP, choisissez une couleur --</option>
              
              </select>
            </div>

            <div class="item__content__settings__quantity">
              <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
            </div>
          </div>

          <div class="item__content__addButton">
            <button id="addToCart">Ajouter au panier</button>
          </div>

        </div>
      </article>`

      //-------------choix de la couleur-------------
      let listeColors = document.getElementById("colors")

      data.colors.forEach(function(colors) {
         let tagOption = document.createElement("option");
         tagOption.innerHTML = colors;
         listeColors.appendChild(tagOption);
      });



//--------------------------------gestion du panier ------------------------
//selection btn ajout produit
const addBtn = document.querySelector("#addToCart")


//ecoute btn envoi panier
addBtn.addEventListener("click", (e)=>{
  window.location.reload();


const idColors = document.querySelector("#colors").value;
const idQuantity = document.querySelector("#quantity").value;

if (idQuantity > 0 && idQuantity <=100 && idColors != "--SVP, choisissez une couleur --") {

  let optionProduct = {
    colors: idColors,
    Id: id,
    name: data.name,
    image: data.imageUrl,
    quantity: Number(idQuantity) 
  }
console.log(optionProduct);


  //---------------------------local storage-------------------------------------------------------------
  
  function saveBasket(basket) {
    localStorage.setItem("product",JSON.stringify(basket));
  }
  
  function getBasket() {
    let basket = localStorage.getItem("product");
    if (basket == null){
      return [];
    }else {
      return JSON.parse(basket);
    }
  }
  
  //ajout au panier
  function addBasket(optionProduct) {
    //si le produit est déja ajouté au panier
    let basket = getBasket();
    let foundProduct = basket.find(p => p.Id === id && p.colors === idColors)
    if (foundProduct != undefined) {
      let newQuantity = parseInt(optionProduct.quantity) + parseInt(foundProduct.quantity);
      foundProduct.quantity = newQuantity;
    }else {
      basket.push(optionProduct);
    }
  
    saveBasket(basket);
  }
  addBasket(optionProduct);
  
  return alert("Votre produit a bien été ajouté au panier")
}else{
  return alert ("Pour ajouter au panier: \n-Sélectionner une couleur\n-sélectionner une quantité entre 1 et 100") 
}

});
console.log(addBtn);      
}).catch((error) =>{
  alert("connexion impossible")
})
     

