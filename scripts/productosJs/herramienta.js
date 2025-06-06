const busquedaInput = document.getElementById('busquedaProducto');
const productos = document.querySelectorAll('.productos-grid .producto');

productos.forEach(p => {
  p.dataset.originalDisplay = p.style.display || '';
});

function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function filtrarProductos() {
  const valor = normalizarTexto(busquedaInput.value.trim());
  productos.forEach(p => {
    const nombre = normalizarTexto(p.querySelector('h3').textContent);
    if (valor === "") {
      p.style.display = p.dataset.originalDisplay;
    } else {
      if (nombre.includes(valor)) {
        p.style.display = 'block';
      } else {
        p.style.display = 'none';
      }
    }
  });
}
busquedaInput.addEventListener('input', filtrarProductos);
    const menuHamburguesa = document.getElementById("menuHamburguesa");
    const menuPrincipal = document.getElementById("menuPrincipal");
    const fondoMenuMovil = document.getElementById("fondoMenuMovil");

    if (menuHamburguesa) {
      menuHamburguesa.addEventListener("click", () => {
        menuPrincipal.classList.toggle("abierto");
        fondoMenuMovil.classList.toggle("activo");
      });
    }

    if (menuPrincipal) {
      menuPrincipal.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          if (window.innerWidth <= 600) {
            menuPrincipal.classList.remove("abierto");
            fondoMenuMovil.classList.remove("activo");
          }
        });
      });
    }

    if (fondoMenuMovil) {
      fondoMenuMovil.addEventListener("click", () => {
        menuPrincipal.classList.remove("abierto");
        fondoMenuMovil.classList.remove("activo");
      });
    }


    const botonesVista = document.querySelectorAll(".vista");
    const modal = document.getElementById("vistaRapidaModal");
    const modalImagen = document.getElementById("modalImagen");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalPrecio = document.getElementById("modalPrecio");
    const modalDescripcion = document.getElementById("modalDescripcion");
    const cerrarModalBtn = document.getElementById("cerrarModal");
    const modalComprarBtn = document.getElementById("modalComprarBtn");

    const carritoLateral = document.getElementById("carritoLateral");
    const carritoLista = document.getElementById("carritoLista");
    const cerrarCarritoBtn = document.getElementById("cerrarCarritoBtn");
    const abrirCarritoBtn = document.getElementById("abrirCarrito");
    const comprarTodoBtn = document.getElementById("comprarTodoBtn");

    let carrito = [];
    let productoModal = null;

    function actualizarCarrito() {
      carritoLista.innerHTML = "";
      carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("itemCarrito");
        div.innerHTML = `
          <img src="${item.img}" alt="${item.nombre}" />
          <div class="info">
            <h4>${item.nombre}</h4>
            <p>${item.precio}</p>
          </div>
          <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        carritoLista.appendChild(div);
      });

      const botonesEliminar = carritoLista.querySelectorAll(".eliminar");
      botonesEliminar.forEach((btn) => {
        btn.addEventListener("click", () => {
          const index = btn.getAttribute("data-index");
          carrito.splice(index, 1);
          actualizarCarrito();
        });
      });
    }

    botonesVista.forEach((boton) => {
      boton.addEventListener("click", () => {
        const producto = boton.closest(".producto");
        productoModal = {
          nombre: producto.querySelector("h3").textContent,
          precio: producto.querySelector("p").textContent,
          img: producto.querySelector("img").src,
          descripcion: producto.querySelector(".descripcion").textContent,
        };
        modalImagen.src = productoModal.img;
        modalTitulo.textContent = productoModal.nombre;
        modalPrecio.textContent = productoModal.precio;
        modalDescripcion.textContent = productoModal.descripcion;
        modal.style.display = "flex";
      });
    });

    if (cerrarModalBtn) {
      cerrarModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        productoModal = null;
      });
    }
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        productoModal = null;
      }
    });

    if (abrirCarritoBtn) {
      abrirCarritoBtn.addEventListener("click", () => {
        carritoLateral.classList.add("abierto");
      });
    }
    if (cerrarCarritoBtn) {
      cerrarCarritoBtn.addEventListener("click", () => {
        carritoLateral.classList.remove("abierto");
      });
    }

    const botonesComprar = document.querySelectorAll(".comprar");
    botonesComprar.forEach((btn) => {
      btn.addEventListener("click", () => {
        const producto = btn.closest(".producto");
        const nombre = producto.querySelector("h3").textContent;
        const precio = producto.querySelector("p").textContent;
        const img = producto.querySelector("img").src;
        carrito.push({ nombre, precio, img });
        actualizarCarrito();
        carritoLateral.classList.add("abierto");
      });
    });

    if (modalComprarBtn) {
      modalComprarBtn.addEventListener("click", () => {
        if (productoModal) {
          carrito.push(productoModal);
          actualizarCarrito();
          modal.style.display = "none";
          carritoLateral.classList.add("abierto");
          productoModal = null;
        }
      });
    }

    if (comprarTodoBtn) {
      comprarTodoBtn.addEventListener("click", () => {
        if (carrito.length === 0) {
          alert("El carrito está vacío.");
          return;
        }
        alert("Gracias por su compra. Total productos: " + carrito.length);
        carrito = [];
        actualizarCarrito();
        carritoLateral.classList.remove("abierto");
      });
    }

    actualizarCarrito();
    filtrarProductos();