const productCart = document.querySelector("#cart__items");
if (productLocalStorage === null) {
  alert("Mince votre panier est vide sélectionner des articles à ajouter au panier")
}
   //si plein 
   const tablData = [];
   for (let product of productLocalStorage) {
    fetch("http://localhost:3000/api/products/" + product.Id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        tablData.push(data);
        console.log(tablData);
        console.log(product);

      productCart.innerHTML += 
      `
        <article class="cart__item" data-id="${product.id}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src=" ${product.image} " alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.colors}</p>
                    <p>${data.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `
        //---------btn supprimer---------------
let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);


for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () =>{
   
        let deleTe =  productLocalStorage[i];
        console.log(deleTe);
        productLocalStorage = productLocalStorage.filter( p => p != deleTe)
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
        window.location.reload();
    }); 
}






     //-------------total prix---------------------
function totalPrice () {

  let totalPriceTabl = [];
//prix dans panier 
for (let i = 0; i < tablData.length && productLocalStorage; i++) {
    let price = tablData[i].price * productLocalStorage[i].quantity;
    console.log( tablData.length); 
    totalPriceTabl.push(price)
    console.log( totalPriceTabl);   
}

//addition des prix pour total
const reducer = (acc, cur) => acc + cur;
const totalPrice = totalPriceTabl.reduce(reducer);
console.log(totalPrice);
//affichage prix
document.querySelector("#totalPrice").innerHTML = totalPrice;
}
totalPrice();






    // ----------------total quantity------------------------
function totalQuantity() {
  
let totalQuantityTabl = [];
//quantité dans panier 
for (let i = 0; i < productLocalStorage.length; i++) {
    let nombre = /*parseInt(quantity)*/productLocalStorage[i].quantity;;

    totalQuantityTabl.push(nombre)
    console.log(totalQuantityTabl);    
}

const reducer = (acc, cur) => acc + cur;
const totalQuantity = totalQuantityTabl.reduce(reducer);
console.log(totalQuantity);
//affichage quantity
document.querySelector("#totalQuantity").innerHTML = totalQuantity;
}
totalQuantity();






//-------------modif quantity-------------

function changeQuantity() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");
console.log(itemQuantity);
  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", () => {
      productLocalStorage[i].quantity = Number(itemQuantity[i].value);
      //appelle fonction pour que prix s'actualise 
      totalPrice();
      totalQuantity();
      localStorage.setItem("product", JSON.stringify(productLocalStorage));
      window.location.reload();
    });   
  }
};
changeQuantity();

})};






//-------------Validation Formulaires--------------------------------

let form = document.querySelector(".cart__order__form");

form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

function validFirstName (inputFirstName) {
  let firstNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  let firstNameErrorMsg = inputFirstName.nextElementSibling;

  if (firstNameRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = "Prénom valide";
    firstNameErrorMsg.style.color = "green";
    return true;
  }else{
    firstNameErrorMsg.innerHTML = "Prénom invalide";
    firstNameErrorMsg.style.color = "red";
    return false;
  }
};


form.lastName.addEventListener("change", function () {
  validLastName(this);
});

function validLastName (inputLastName) {
  let lastNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (lastNameRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = "Nom valide";
    lastNameErrorMsg.style.color = "green";
    return true;
  }else{
    lastNameErrorMsg.innerHTML = "Nom invalide";
    lastNameErrorMsg.style.color = "red";
    return false;
  }
};




form.address.addEventListener("change", function () {
  validAddress(this);
});

function validAddress (inputAddress) {
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  let addressErrorMsg = inputAddress.nextElementSibling;

  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = "Adresse valide";
    addressErrorMsg.style.color = "green";
    return true;
  }else{
    addressErrorMsg.innerHTML = "Adresse invalide";
    addressErrorMsg.style.color = "red";
    return false;
  }
};

form.city.addEventListener("change", function () {
  validCity(this);
});

function validCity (inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  let cityErrorMsg = inputCity.nextElementSibling;

  if (cityRegExp.test(inputCity.value)) {
    cityErrorMsg.innerHTML = "ville valide";
    cityErrorMsg.style.color = "green";
    return true;
  }else{
    cityErrorMsg.innerHTML = "ville invalide";
    cityErrorMsg.style.color = "red";
    return false; 
  }
};




form.email.addEventListener("change", function () {
  validEmail(this);
});

function validEmail(inputEmail) {
  let emaiRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let emailErrorMsg = inputEmail.nextElementSibling;

  if (emaiRegExp.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = "Adresse valide";
    emailErrorMsg.style.color = "green";
    return true;
  }else{
    emailErrorMsg.innerHTML = "Adresse non valide";
    emailErrorMsg.style.color = "red";
    return false;
  }
};



function postForm() {
  const submitOrder = document.getElementById("order");

  submitOrder.addEventListener("click", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    
    
    const order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: productLocalStorage.map(p => p.Id)
    }
if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) { 
  fetch("http://localhost:3000/api/products/order",{
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
       window.location.href= "/front/html/confirmation.html" + "?orderId=" + data.orderId;
       localStorage.clear();
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
}else{
  alert ("Le formulaire de contact doit être correctement rempli pour passer la commande. \ud83d\ude2d");
}


  })
}
postForm();

