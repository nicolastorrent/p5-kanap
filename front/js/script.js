fetch("http://localhost:3000/api/products")
.then(res => res.json())
.then(data => {
    console.log(data);
    for (let product of data) {
      console.log(product);
        document.getElementById("items").innerHTML +=
        `<a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`
    }
}).catch((error) =>{
    alert("connexion impossible")
})
