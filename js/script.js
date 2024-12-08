fetch('../data/productos.JSON')
  .then(response => response.json())
  .then(productos => {
    productos.forEach(producto => {
      const container = document.querySelector('.containerProducts')
      const productHTML = `
        <div class="product">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="details">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Comprar</button>
          </div>
        </div>`
      container.innerHTML += productHTML
    });
  })
  .catch(error => console.log( error))
