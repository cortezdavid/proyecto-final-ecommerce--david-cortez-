const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const listaCarrito = document.getElementById("carrito")

if (carrito.length == 0) {
  listaCarrito.innerHTML = "<h2>vacio</h2>"
}

for (let i = 0; i < carrito.length; i++) {
  const producto = carrito[i]
  const carritoProduct = `
       <article class="product">
          <img src="${producto.img}" alt="${producto.name}">
          <div class="details">
            <h3>${producto.name}</h3>
            <p>$${producto.price}</p>
          </div>
        </article>`
  listaCarrito.innerHTML += carritoProduct
}

const vaciarCarrito = document.getElementById("borrar")
vaciarCarrito.addEventListener("click", () => {
  localStorage.removeItem("carrito")
  listaCarrito.innerHTML = "<h2>vacio</h2>"
})
