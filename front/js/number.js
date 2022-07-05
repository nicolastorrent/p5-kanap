
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);

function totalBasket () {

  const reducer = (acc, cur) => acc + cur;
  
  let totalQuantityTabl = [];
  
  //quantité dans panier 
  for (let i = 0; i < productLocalStorage.length; i++) {
      let quantity = productLocalStorage[i].quantity;
      let nombre = quantity;
  
      totalQuantityTabl.push(nombre)
      console.log(totalQuantityTabl);  
      
  }
  
  const totalQuantity = totalQuantityTabl.reduce(reducer);
  console.log(totalQuantity);

  const quantityInHtml =`${totalQuantity}`;


  const newLi = document.createElement("li");
  newLi.innerHTML = quantityInHtml;
  document.querySelector("nav ul").appendChild(newLi);

  newLi.style.color = "#3498db";
  newLi.style.fontWeight = "bold";
  newLi.style.marginLeft = "0px";
  }
  totalBasket();