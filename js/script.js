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
            <div class="productActions">
              <div>
                <button class="btnCount btnSubtract" id="btnSubtract">-</button>
                <span id="quantity" class="quantity">${1}</span>
                <button class="btnCount btnAdd" id="btnAdd">+</button>
              </div>
              <div>
                <button class="BtnAddToCart">Comprar</button>
              </div>
            </div>
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
        const productPosition = carrito.findIndex(product => product.id == id);
        if (productPosition !== -1) {
          carrito[productPosition].quantity += 1;
        } else {
          const product = {
            id: id,
            name: nombre,
            price: precio,
            img: imagen,
            quantity: 1,
          };
          carrito.push(product);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
      })
    }
  })
}

showProducts()
handlePurchase()
