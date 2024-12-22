const getProducts = () => {
  return fetch('../data/productos.JSON')
    .then(response => response.json())
    .catch(error => console.log(error))
}

  getProducts().then(products => {
    products.forEach(product => {
      const container = document.querySelector('.containerProducts')
      const productHTML = `
        <article class="product" data-id=${product.id}>
          <a href="./details.html?id=${product.id}">
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="details">
              <h3>${product.nombre}</h3>
              <p>$${(product.precio).toFixed(3)}</p>
            </div>
          </a>
        </article>`
      container.innerHTML += productHTML
    });
  })