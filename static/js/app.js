/**
 * TechShop - Lógica Principal
 * Autor: Jhon Alejandro Diaz J.
 */

// ====== VARIABLES Y DATOS DE PRODUCTO ======
  const products = [
    {
      id: 1,
      nombre: "Teclado Mecánico RGB",
      descripcion: "Switches mecánicos, retroiluminación personalizable, ideal para programar durante horas.",
      precio: 120000,
      img: "https://picsum.photos/300/200?random=1"
    },
    {
      id: 2,
      nombre: "Mouse Ergonómico Wireless",
      descripcion: "6 botones programables, DPI ajustable, conexión USB y Bluetooth.",
      precio: 95000,
      img: "https://picsum.photos/300/200?random=2"
    },
    {
      id: 3,
      nombre: "Monitor UltraWide 29\" IPS",
      descripcion: "Pantalla IPS FHD, 29 pulgadas, ideal para multitarea y desarrollo.",
      precio: 890000,
      img: "https://picsum.photos/300/200?random=3"
    },
    {
      id: 4,
      nombre: "Soporte para Portátil Ajustable",
      descripcion: "Aluminio, 6 niveles de altura, mejora la ventilación de tu notebook.",
      precio: 42000,
      img: "https://picsum.photos/300/200?random=4"
    },
    {
      id: 5,
      nombre: "Audífonos Inalámbricos Bluetooth",
      descripcion: "Reducción de ruido activa, 40h batería, carga rápida USB-C.",
      precio: 150000,
      img: "https://picsum.photos/300/200?random=5"
    },
    {
      id: 6,
      nombre: "Silla Ergonómica de Oficina",
      descripcion: "Soporte lumbar, espaldar alto, ajustable, confort premium.",
      precio: 540000,
      img: "https://picsum.photos/300/200?random=6"
    },
    {
      id: 7,
      nombre: "Alfombrilla Extendida",
      descripcion: "Base antideslizante, extra grande, resistente al agua.",
      precio: 34000,
      img: "https://picsum.photos/300/200?random=7"
    },
    {
      id: 8,
      nombre: "Lámpara LED con Brazo Flexible",
      descripcion: "3 temperaturas de color, cargador USB incluido.",
      precio: 61000,
      img: "https://picsum.photos/300/200?random=8"
    },
    {
      id: 9,
      nombre: "Hub USB 3.0 de 4 Puertos",
      descripcion: "Transferencia rápida, tamaño compacto, ideal para portátiles.",
      precio: 28000,
      img: "https://picsum.photos/300/200?random=9"
    },
    {
      id: 10,
      nombre: "Cojín Lumbar Viscoelástico",
      descripcion: "Diseño ergonómico, mejora la postura en jornadas largas.",
      precio: 25000,
      img: "https://picsum.photos/300/200?random=10"
    },
    {
      id: 11,
      nombre: "Micrófono Condensador USB",
      descripcion: "Ideal para videollamadas, streaming y grabación de podcasts.",
      precio: 79000,
      img: "https://picsum.photos/300/200?random=11"
    },
    {
      id: 12,
      nombre: "Kit de Limpieza para Electrónicos",
      descripcion: "Incluye gel, paños y brochas. Limpia tu setup como nuevo.",
      precio: 18000,
      img: "https://picsum.photos/300/200?random=12"
    }
  ];

  // Captura de elementos DOM
  const productosGrid = document.querySelector(".productos-grid");
  const cartItems = document.getElementById("cart-items");
  const subtotalSpan = document.getElementById("subtotal");
  const ivaSpan = document.getElementById("iva");
  const totalSpan = document.getElementById("total");
  const pagoInput = document.getElementById("pago");
  const cambioDiv = document.getElementById("cambio");
  const btnCambio = document.getElementById("btn-cambio");
  const btnFactura = document.getElementById("btn-factura");
  const domicilioCheckbox = document.getElementById("domicilio");
  const formDomicilio = document.getElementById("form-domicilio");
  const facturaSection = document.getElementById("factura");
  
  // Estado del carrito (array de productos)
  let carrito = [];
  
  // ========== FUNCIONES PRINCIPALES ==========
  
    // Función para mostrar la vista deseada y ocultar las demás
  function mostrarVista(vista) {
    const secciones = ['landing', 'catalogo', 'carrito'];
      secciones.forEach(id => {
        document.getElementById(id).style.display = (id === vista) ? 'block' : 'none';
      });
      // Opcional: actualiza nav activo
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-view') === vista);
    });
  }    
    
  // Renderiza el catálogo de productos en la página
  function renderCatalogo() {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = '';
    products.forEach((product) => {
      // Checa si el producto ya está en el carrito
      const itemCarrito = carrito.find(item => item.id === product.id);
  
      let controlsHTML = '';
      if (!itemCarrito) {
        // Si no hay unidades, solo el botón para añadir
        controlsHTML = `
          <button class="btn-comprar" onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
      } else {
        // Si ya hay unidades, muestra el contador y botones +/-
        controlsHTML = `
          <div class="catalogo-controles">
            <button class="btn-control" onclick="changeQty(${product.id}, -1)">-</button>
            <span class="catalogo-cantidad">${itemCarrito.cantidad}</span>
            <button class="btn-control" onclick="changeQty(${product.id}, 1)">+</button>
          </div>
        `;
      }
  
      // La tarjeta del producto
      const card = document.createElement("article");
      card.className = "producto-card";
      card.innerHTML = `
        <img src="${product.img}" alt="${product.nombre}">
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
        <span class="precio">$${product.precio.toLocaleString()}</span>
        ${controlsHTML}
      `;
      productosGrid.appendChild(card);
    });
  }
  
    // Renderiza el carrito en pantalla
  function renderCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    if (carrito.length === 0) {
      cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
      carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.img}" alt="${item.nombre}" style="width:48px;height:48px;border-radius:6px;">
          <span>${item.nombre}</span>
          <span>x${item.cantidad}</span>
          <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="changeQty(${item.id}, -1)" ${item.cantidad <= 1 ? 'disabled' : ''}>-</button>
          <button onclick="removeFromCart(${item.id})" title="Eliminar">🗑</button>
        `;
        cartItems.appendChild(div);
      });
    }
    calcularTotales();
  }

  function actualizarCarritoNav() {
    // Suma la cantidad total de unidades en el carrito
    const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('carrito-cantidad-indicador').innerText = cantidad;
  }
  
  // Añade un producto al carrito
  function addToCart(productId) {
    const producto = products.find(p => p.id === productId);
    if (!producto) return;
    const item = carrito.find(p => p.id === productId);
    if (item) {
      item.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    renderCarrito();
    renderCatalogo();
    actualizarCarritoNav();
  }
  window.addToCart = addToCart; // Necesario si usas onclick en HTML
  
  function changeQty(productId, change) {
    const item = carrito.find(p => p.id === productId);
    if (item) {
      item.cantidad += change;
      if (item.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== productId);
      }
      renderCarrito();
      renderCatalogo();
    }
  }
  window.changeQty = changeQty;
  
  function removeFromCart(productId) {
    carrito = carrito.filter(p => p.id !== productId);
    renderCarrito();
    renderCatalogo();
  }
  window.removeFromCart = removeFromCart;
  
  
  // Calcula totales: subtotal, IVA, total
  function calcularTotales() {
    const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const iva = Math.round(subtotal * 0.19);
    const total = subtotal + iva;
    document.getElementById('subtotal').innerText = subtotal.toLocaleString();
    document.getElementById('iva').innerText = iva.toLocaleString();
    document.getElementById('total').innerText = total.toLocaleString();
  }
  
  // Maneja el cálculo de cambio con billetes/monedas de denominaciones comunes COP
  function calcularCambio() {
    const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const iva = Math.round(subtotal * 0.19);
    const total = subtotal + iva;
  
    const pagoInput = document.getElementById('pago').value.trim();
    function convertirStringANumero(str) {
      const soloDigitos = str.replace(/[^0-9]/g, '');
      return parseInt(soloDigitos, 10) || 0;
    }
  
    const pago = convertirStringANumero(pagoInput);
    let cambio = pago - total;
    let msg = '';
  
    if (subtotal === 0) {
      msg = '<span style="color:#f43f5e;">Agrega productos y calcula el total antes de pagar.</span>';
    } else if (cambio < 0) {
      msg = '<span style="color:#f43f5e;">Falta dinero para completar el pago.</span>';
    } else {
      msg = `<div class="cambio-resumen"><span class="cambio-monto">Cambio:</span> <b>$${cambio.toLocaleString()}</b></div>`;
      // Estructura en tabla
      const denominaciones = [50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50];
      let desglose = [];
      let resto = cambio;
      for (const den of denominaciones) {
        const cantidad = Math.floor(resto / den);
        if (cantidad > 0) {
          desglose.push({ den, cantidad });
          resto %= den;
        }
      }
      if (desglose.length > 0) {
        msg += `<div class="cambio-desglose">
          <span class="cambio-label">Desglose de billetes/monedas:</span>
          <table class="tabla-desglose">
            <thead><tr><th>Denominación</th><th>Cantidad</th></tr></thead>
            <tbody>
              ${desglose.map(d => `<tr><td>$${d.den.toLocaleString()}</td><td>${d.cantidad}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>`;
      }
    }
    document.getElementById('cambio').innerHTML = msg;
  }  
  
  // Generar y mostrar la factura
  function generarFactura() {
    const facturaSec = document.getElementById('factura');
    facturaSec.style.display = 'block';
  
    // Calcula totales reales desde el carrito
    const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const iva = Math.round(subtotal * 0.19);
    const total = subtotal + iva;
  
    // Datos de cliente si hay domicilio
    const esDomicilio = document.getElementById('domicilio').checked;
    let nombre = '', direccion = '', telefono = '';
    if (esDomicilio) {
      nombre = document.getElementById('nombre').value.trim();
      direccion = document.getElementById('direccion').value.trim();
      telefono = document.getElementById('telefono').value.trim();
    }
  
    // Seguridad: alerta si el carrito está vacío
    if (carrito.length === 0) {
      facturaSec.innerHTML = `<div class="factura-void">No hay productos para facturar.</div>`;
      return;
    }
  
    // Construye el HTML de la factura
    let html = `
      <div class="factura-box">
        <h3>Factura Electrónica</h3>
        <p><b>Vendedor:</b> Jhon Alejandro Diaz J. | TechShop</p>
        <table class="factura-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
    `;
    carrito.forEach(item => {
      html += `
        <tr>
          <td>${item.nombre}</td>
          <td style="text-align:center;">${item.cantidad}</td>
          <td>$${item.precio.toLocaleString()}</td>
          <td>$${(item.precio * item.cantidad).toLocaleString()}</td>
        </tr>
      `;
    });
    html += `
          </tbody>
        </table>
        <div class="factura-totales">
          <p><b>Subtotal:</b> $${subtotal.toLocaleString()}</p>
          <p><b>IVA (19%):</b> $${iva.toLocaleString()}</p>
          <p><b>Total a pagar:</b> $${total.toLocaleString()}</p>
        </div>
    `;
  
    if (esDomicilio) {
      html += `
        <div class="factura-domicilio">
          <h4>Datos del Cliente</h4>
          <p><b>Nombre:</b> ${nombre || "<i>No registrado</i>"}</p>
          <p><b>Dirección:</b> ${direccion || "<i>No registrada</i>"}</p>
          <p><b>Teléfono:</b> ${telefono || "<i>No registrado</i>"}</p>
        </div>
      `;
    }
  
    html += `
      <p class="factura-gracias"><b>¡Gracias por tu compra en TechShop!</b></p>
      <button type="button" onclick="cerrarFactura()" class="btn-comprar">Cerrar</button>
      </div>
    `;
  
    facturaSec.innerHTML = html;
    mostrarVista('factura');
  }
  
  // Botón para cerrar factura y volver al carrito
  function cerrarFactura() {
    document.getElementById('factura').style.display = 'none';
    mostrarVista('carrito');
  }
  window.generarFactura = generarFactura;
  window.cerrarFactura = cerrarFactura;
  
    // ========= EVENTOS BÁSICOS =========
  // Botón del landing para ir al catálogo:
  document.addEventListener('DOMContentLoaded', () => {
    const irCatalogoBtn = document.getElementById('irCatalogoBtn');
    if (irCatalogoBtn) {
      irCatalogoBtn.addEventListener('click', () => {
        mostrarVista('catalogo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  document.getElementById('btn-factura').addEventListener('click', generarFactura);
  
  window.addEventListener("DOMContentLoaded", renderCatalogo);

  document.getElementById('btn-cambio').addEventListener('click', calcularCambio);
 
  // Muestra u oculta el formulario de domicilio según el checkbox
  domicilioCheckbox.addEventListener("change", () => {
    formDomicilio.style.display = domicilioCheckbox.checked ? "block" : "none";
  });

  // Vincular los enlaces del nav para cambiar de vista
  document.querySelectorAll('nav ul li a[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const vista = link.getAttribute('data-view');
      mostrarVista(vista);

      // Opcional: scroll arriba para UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  let lastScroll = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
    if (currentScroll <= 0) {
      header.style.top = '0';
      return;
    }
  
    if (currentScroll > lastScroll) {
      // Scroll hacia abajo -> oculta navbar
      header.style.top = '-80px'; // ajusta según altura del navbar
    } else {
      // Scroll hacia arriba -> muestra navbar
      header.style.top = '0';
    }
    
    lastScroll = currentScroll;
  });
  
  
  
  