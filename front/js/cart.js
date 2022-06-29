
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);

const productCart = document.querySelector("#cart__items")
console.log(productCart);

   //si plein 
    let productHtml = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
        productHtml = productHtml + `
        <article class="cart__item" data-id="${productLocalStorage[i].id}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src=" ${productLocalStorage[i].image} " alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productLocalStorage[i].name}</h2>
                    <p>${productLocalStorage[i].colors}</p>
                    <p>${productLocalStorage[i].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `
        
        productCart.innerHTML = productHtml; 
        
      } 


//---------btn supprimer---------------
let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);


for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (event) =>{
        
//Sélection du produit qui va être supprimer au clic   
        let deleTe =  productLocalStorage[i];
        console.log(deleTe);
   
//Créer et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent la condition de fonction callback
//pour sélectionner élément à garder et supprimer l'élément de mon btn
        productLocalStorage = productLocalStorage.filter( p => p != deleTe)
        console.log(productLocalStorage);
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
        window.location.href = "cart.html";
    }); 
}




//-------------total prix---------------------
function total () {

  let totalPriceTabl = [];

//prix dans panier 
for (let i = 0; i < productLocalStorage.length; i++) {
    let price = productLocalStorage[i].price * productLocalStorage[i].quantity;

    totalPriceTabl.push(price)
    console.log( totalPriceTabl);   
}

//addition des prix pour total
const reducer = (acc, cur) => acc + cur;
const totalPrice = totalPriceTabl.reduce(reducer);
console.log(totalPrice);

//affichage prix
const totalInHtml= document.querySelector("#totalPrice")
const priceInHtml =`${totalPrice}`;
totalInHtml.innerHTML = priceInHtml;


let totalQuantityTabl = [];

//quantité dans panier 
for (let i = 0; i < productLocalStorage.length; i++) {
    let quantity = productLocalStorage[i].quantity;
    let nombre = /*parseInt(quantity)*/quantity;

    totalQuantityTabl.push(nombre)
    console.log(totalQuantityTabl);  
    
}

const totalQuantity = totalQuantityTabl.reduce(reducer);
console.log(totalQuantity);

//affichage quantity
const totalQInHtml= document.querySelector("#totalQuantity")
const quantityInHtml =`${totalQuantity}`;
totalQInHtml.innerHTML = quantityInHtml;
}
total();



//-------------modif quantity-------------

function changeQuantity() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", () => {
     // stock dans une variable la quantité
      let quantityValue = itemQuantity[i].value;
      //récupération de la quantité dans localstorage
      productLocalStorage[i].quantity = Number(quantityValue);
      //appelle fonction pour que prix s'actualise 
      total();
      localStorage.setItem("product", JSON.stringify(productLocalStorage));

    });
    
  }
};
changeQuantity();





let form = document.querySelector(".cart__order__form");


form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

const validFirstName = function (inputFirstName) {
  let firstNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  let firstNameErrorMsg = inputFirstName.nextElementSibling;

  if (firstNameRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = "Prénom valide";
    firstNameErrorMsg.style.color = "green";
  }else{
    firstNameErrorMsg.innerHTML = "Prénom invalide";
    firstNameErrorMsg.style.color = "red";
  }
};


form.lastName.addEventListener("change", function () {
  validLastName(this);
});

const validLastName = function (inputLastName) {
  let lastNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (lastNameRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = "Nom valide";
    lastNameErrorMsg.style.color = "green";
  }else{
    lastNameErrorMsg.innerHTML = "Nom invalide";
    lastNameErrorMsg.style.color = "red";
  }
};




form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAddress) {
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  let addressErrorMsg = inputAddress.nextElementSibling;

  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = "Adresse valide";
    addressErrorMsg.style.color = "green";
  }else{
    addressErrorMsg.innerHTML = "Adresse invalide";
    addressErrorMsg.style.color = "red";
  }
};

form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  let cityErrorMsg = inputCity.nextElementSibling;

  if (cityRegExp.test(inputCity.value)) {
    cityErrorMsg.innerHTML = "ville valide";
    cityErrorMsg.style.color = "green";
  }else{
    cityErrorMsg.innerHTML = "ville invalide";
    cityErrorMsg.style.color = "red";
  }
};




form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emaiRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let emailErrorMsg = inputEmail.nextElementSibling;

  if (emaiRegExp.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = "Adresse valide";
    emailErrorMsg.style.color = "green";
  }else{
    emailErrorMsg.innerHTML = "Adresse non valide";
    emailErrorMsg.style.color = "red";
  }
};



function postForm() {
  const submitOrder = document.getElementById("order");

  submitOrder.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    
    
    const order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: productLocalStorage.map(product => product.Id)
    }


    fetch("http://localhost:3000/api/products/order",{
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        //window.location.href= "/front/html/confirmation.html" + "?orderId=" + data.orderId;
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

     

  })
}
postForm();
