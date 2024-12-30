document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoBody = document.getElementById("carrito-body");
    const totalCarrito = document.getElementById("total-carrito");
    const btnVaciar = document.getElementById("vaciar-carrito");
    const btnProcesar = document.getElementById("procesar-compra");

    // Función para actualizar el carrito en pantalla
    const actualizarCarrito = () => {
        carritoBody.innerHTML = "";
        let total = 0;

        carrito.forEach((producto) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>
                    <button class="disminuir-cantidad" data-id="${producto.id}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="aumentar-cantidad" data-id="${producto.id}">+</button>
                </td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><button class="eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
            `;
            carritoBody.appendChild(row);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    // Eventos para botones "Vaciar Carrito" y "Procesar Compra"
    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        carrito = [];
        actualizarCarrito();
    });

    btnProcesar.addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Compra procesada exitosamente.");
            carrito = []; // Vacía el carrito en la memoria
            localStorage.removeItem("carrito"); // Elimina el carrito del localStorage
            actualizarCarrito(); // Refresca la vista del carrito
        } else {
            alert("El carrito está vacío.");
        }
    });
    

    // Manejo de eventos para la tabla del carrito
    carritoBody.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);

        // Incrementar cantidad
        if (e.target.classList.contains("aumentar-cantidad")) {
            carrito = carrito.map((prod) => {
                if (prod.id === id) {
                    prod.cantidad++;
                }
                return prod;
            });
            actualizarCarrito();
        }

        // Disminuir cantidad
        if (e.target.classList.contains("disminuir-cantidad")) {
            carrito = carrito.map((prod) => {
                if (prod.id === id && prod.cantidad > 1) {
                    prod.cantidad--;
                }
                return prod;
            });
            actualizarCarrito();
        }

        // Eliminar producto
        if (e.target.classList.contains("eliminar-producto")) {
            carrito = carrito.filter((prod) => prod.id !== id);
            actualizarCarrito();
        }
    });

    actualizarCarrito();
});
