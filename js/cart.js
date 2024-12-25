const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const listaCarrito = document.getElementById("carrito")
const actionCart = document.getElementById("actionCart")
const total = carrito.reduce((acc, product) => acc + product.price * product.quantity, 0)

if (carrito.length == 0) {
  listaCarrito.innerHTML = `
  <div class="empty">
    <i class="fa-solid fa-circle-exclamation"></i>
    <p>Vacio</p>
  </div>
  `
} else {
  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i]
    const carritoProduct = `
         <article class="product" data-id=${producto.id}>
            <img src="${producto.img}" alt="${producto.name}">
            <div class="">
              <h3>${producto.name}</h3>
              <p>$${(producto.price * producto.quantity).toFixed(3)}</p>
              <p>cantidad: ${producto.quantity}</p>
            </div>
            <button class="btnRemove">Borrar</button>
          </article>`
    listaCarrito.innerHTML += carritoProduct
  }
  actionCart.innerHTML += `
  <div class="actionCart">
    <p>Total: $${total.toFixed(3)}</p>
    <button id="btnRemoveAll">Vaciar carrito</button>
    <button id="btnCheckout">Comprar</button>
  </div>`
}

listaCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnRemove")) {
    const article = e.target.closest("article")
    const id = article.dataset.id
    const newCart = carrito.filter(products => products.id !== id);
    localStorage.setItem("carrito", JSON.stringify(newCart));
    location.reload()
  }
})

const btnRemoveAll = document.getElementById("btnRemoveAll")
const btnCheckout = document.getElementById("btnCheckout")
const deleteLocalStorage = () => {
  localStorage.removeItem("carrito")
  listaCarrito.innerHTML = `
  <div class="empty">
    <i class="fa-solid fa-circle-exclamation"></i>
    <p>Vacio</p>
  </div>
  `
}

if (btnRemoveAll) {
  btnRemoveAll.addEventListener("click", deleteLocalStorage);
}
if (btnCheckout) {
  btnCheckout.addEventListener("click", deleteLocalStorage);
}
