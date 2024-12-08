const getProducts = () => {
  return fetch('../data/productos.JSON')
    .then(response => response.json())
    .catch(error => console.log(error))
}

const showProducts = () => {
  getProducts().then(products => {
    products.forEach(product => {
      const container = document.querySelector('.containerProducts')
      const productHTML = `
        <article class="product" data-id=${product.id}>
          <img src="${product.imagen}" alt="${product.nombre}">
          <div class="details">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <button class="BtnAddToCart">Comprar</button>
          </div>
        </article>`
      container.innerHTML += productHTML
    });
  })
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const handlePurchase = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("BtnAddToCart")) {
      const id = e.target.closest("article").dataset.id
      getProducts().then(products => {
        const element = products.find(product => product.id == id)
        const { nombre, precio, imagen } = element
        const product = {
          id: id,
          name: nombre,
          price: precio,
          img: imagen,
          quantity: 1,
        }
        carrito.push(product)
        localStorage.setItem("carrito", JSON.stringify(carrito))
      })
    }
  })
}

showProducts()
handlePurchase()
