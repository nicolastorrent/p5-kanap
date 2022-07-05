let items = document.querySelector(".item")
const color = document.querySelector(".color")


let url_courant  = document.location.href

let id = url_courant.substring(32,url_courant.length)
id = id.slice(id.length - 32, id.length)

const url = "http://localhost:3000/api/products";
const getData = () =>{
    fetch(url + "/" + id)
    .then((res) => res.json())
    .then(function(data ){
        console.log(data);

      

        items.innerHTML =`
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

      // variable represente la balise select avec l'ID colors
      let select = document.getElementById("colors")

        //data.colors le tableau des couleur donc utiliser forEach pour fair une boucle 
        //(colors)represente un element choix du nom pas imposer
      data.colors.forEach((colors) => {
         //document.creatElement permet de cree un element ici la balise <option> pour les option de la liste
         // la variable let tagOption permet de stocker document.createElement("option")
         let tagOption = document.createElement("option");
        //pour injecter les donner
         tagOption.innerHTML = `${colors}`;
         tagOption.value = `${colors}`;
        //pour dire oi placer les donner de la balise option qui es un enfant de select
         select.appendChild(tagOption);
      });





//--------------------------------gestion du panier ------------------------
//recuperation des donner sélectionnées par l'utilisateur et envoie au panier 





//selection btn ajout produit
const addBtn = document.querySelector("#addToCart")


//ecoute btn envoi panier
addBtn.addEventListener("click", (event)=>{
  window.location.reload();/////////////////////////////////////////////////////////////////////////////////////

// selection de l'id du formulaire
const idColors = document.querySelector("#colors").value;
const idQuantity = document.querySelector("#quantity").value;
//const choiceColor = idColors.value;
//const choiceQuantity =  idQuantity.value;

if (idQuantity > 0 && idQuantity <=100 && idColors != "--SVP, choisissez une couleur --") {

  let optionProduct = {
    colors: idColors,
    Id: id,
    name: data.name,
    image: data.imageUrl,
    price: data.price,
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
  
  function addBasket(optionProduct) {
    //si le produit est déja ajouté au panier
    let basket = getBasket();
    let foundProduct = basket.find(p => p.Id === id && p.colors === idColors)
    if (foundProduct != undefined) {
      let newQuantity = parseInt(optionProduct.quantity) + parseInt(foundProduct.quantity);
      foundProduct.quantity = newQuantity;
    //si le produit n'est pas encore ajouté au panier
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

      
})
     
}
getData();
