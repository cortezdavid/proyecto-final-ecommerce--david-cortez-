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
          <img src="${product.imagen}" alt="${product.nombre}">
          <div class="details">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <a href="http://127.0.0.1:5500/entrega/pages/details.html?id=${product.id}" class="BtnAddToCart">detalles</a>
          </div>
        </article>`
      container.innerHTML += productHTML
    });
  })