const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const listaCarrito = document.getElementById("carrito")

if (carrito.length == 0) {
  listaCarrito.innerHTML = "<h2>vacio</h2>"
}

for (let i = 0; i < carrito.length; i++) {
  const producto = carrito[i]
  const carritoProduct = `
       <article class="product" data-id=${producto.id}>
          <img src="${producto.img}" alt="${producto.name}">
          <div class="details">
            <h3>${producto.name}</h3>
            <p>$${(producto.price * producto.quantity).toFixed(3)}</p>
            <p>cantidad: ${producto.quantity}</p>
          </div>
          <button class="btnRemove">Borrar</button>
        </article>`
  listaCarrito.innerHTML += carritoProduct
}

listaCarrito.addEventListener("click", (e)=>{
  if (e.target.classList.contains("btnRemove")) {
    const article = e.target.closest("article")
    const id = article.dataset.id
    const newCart = carrito.filter(products => products.id !== id);
    localStorage.setItem("carrito", JSON.stringify(newCart));
    location.reload()
  }
})

const vaciarCarrito = document.getElementById("btnRemoveAll")
vaciarCarrito.addEventListener("click", () => {
  localStorage.removeItem("carrito")
  listaCarrito.innerHTML = "<h2>vacio</h2>"
})
