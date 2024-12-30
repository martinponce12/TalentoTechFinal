// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Seleccionamos todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.agregar-carrito');

// Agregamos el evento a cada botón
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const productoElement = e.target.parentElement;

        // Extraemos la información del producto
        const producto = {
            id: parseInt(e.target.dataset.id),
            nombre: productoElement.querySelector('h3').textContent,
            precio: parseFloat(productoElement.querySelector('span').textContent.replace('Precio: $', '')),
            imagen: productoElement.querySelector('img').src,
            cantidad: 1
        };

        // Verificamos si ya existe en el carrito
        const existe = carrito.some(item => item.id === producto.id);

        if (existe) {
            // Si existe, incrementamos la cantidad
            carrito = carrito.map(item => {
                if (item.id === producto.id) {
                    item.cantidad++;
                }
                return item;
            });
        } else {
            // Si no existe, lo añadimos al carrito
            carrito.push(producto);
        }

        // Guardamos el carrito en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Notificación al usuario
        alert(`"${producto.nombre}" agregado al carrito.`);
    });
});
