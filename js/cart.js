const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const listaCarrito = document.getElementById("carrito")
const actionCart = document.getElementById("actionCart")
const total = carrito.reduce((acc, product) => acc + product.price * product.quantity, 0)

if (carrito.length == 0) {
  listaCarrito.innerHTML = `
  <div class="empty">
    <i class="fa-solid fa-circle-exclamation"></i>
    <p>Vacio</p>
  </div>`
  actionCart.remove()
} else {
  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i]
    const carritoProduct = `
         <article class="productCart" data-id=${producto.id}>
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
  let nameProducts = ""
  for (let i = 0; i < carrito.length; i++) {
    nameProducts += `<p>${carrito[i].name}</p>`; 
  }
  actionCart.innerHTML += `
  <div class="buy">
    <div>
      ${nameProducts}
    </div>
    <h3>Total: $${total.toFixed(3)}</h3>
    <div class="buttonsCart">
      <button id="btnRemoveAll">Vaciar carrito</button>
      <button id="btnCheckout">Comprar</button>
    </div>
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
  </div>`
  actionCart.remove()
}

if (btnRemoveAll) {
  btnRemoveAll.addEventListener("click", deleteLocalStorage);
}
if (btnCheckout) {
  btnCheckout.addEventListener("click", deleteLocalStorage);
}
