const queryString = window.location.search

const urlParams = new URLSearchParams(queryString)
const idProduct = urlParams.get("id")

const carrito = JSON.parse(localStorage.getItem("carrito")) || []


const getProducts = () => {
  return fetch('../data/productos.JSON')
    .then(response => response.json())
    .catch(error => console.log(error))
}

getProducts().then(products => {
  const element = products.find(product => product.id == idProduct)
  const container = document.querySelector('.container')
  const productHTML = `
  <h2 class="nameDetail">${element.nombre}</h2>
  <article class="productDetail" data-id=${element.id}>
    <img src="${element.imagen}" alt="${element.nombre}">
    <div>
      <h3>$${(element.precio).toFixed(3)}</h3>
      <p>${element.detalles}</p>
      <div class="productActions">
        <p>cantidad:</p>
        <button class="btnCount btnSubtract" id="btnSubtract">-</button>
        <span id="quantity" class="quantity">1</span>
        <button class="btnCount btnAdd" id="btnAdd">+</button>
        <button class="BtnAddToCart">Agregar al carrito</button>
      </div>
      <a href="./products.html" class=""><button>Volver</button>
</a>
    </div>
  </article>
  <div class="calificaciones">
    <h4>Calificaciones:</h4>
    <div class="reviews">
      ${element.calificaciones.map(calificacion =>
       `<div class="review">
          <i class="fa-solid fa-circle-user"></i>
          <div>
            <strong>${calificacion.nombre}</strong>
            <p>${calificacion.calificacion}</p>
            <span>${calificacion.estrellas}</span>
          </div>
        </div>
        `).join("")}
    </div>
  </div>`
  container.innerHTML += productHTML
})

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("BtnAddToCart")) {
    getProducts().then(products => {
      const productQuantity = parseInt(document.getElementById("quantity").textContent, 10);
      const element = products.find(product => product.id == idProduct)
      const { nombre, precio, imagen } = element
      const productPosition = carrito.findIndex(product => product.id == idProduct)
      if (productPosition !== -1) {
        carrito[productPosition].quantity += productQuantity;
      } else {
        const product = {
          id: idProduct,
          name: nombre,
          price: precio,
          img: imagen,
          quantity: productQuantity,
        };
        carrito.push(product);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito))
    })
  }
})

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnAdd")) {
   
    const quantitySpan = e.target.previousElementSibling
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
  }
  if (e.target.classList.contains("btnSubtract")) {
    const quantitySpan = e.target.nextElementSibling
    if (parseInt(quantitySpan.textContent) > 1) {
      quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
    }
  }
});
