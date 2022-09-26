const baseDeDatosCelulares = [
    {
        modelo: "iPhone 14",
        codigo: 1,
        precio: 2100,
        imagen: './img/iPhone-14.png'
    },
    {
        modelo: "iPhone 13",
        codigo: 2,
        precio: 1700,
        imagen: './img/iPhone-13.png'
    },
    {
        modelo: "iPhone 12 Pro Max",
        codigo: 3,
        precio: 1550,
        imagen: './img/iPhone-12-ProMax.png'
    },
    {
        modelo: "iPhone 12",
        codigo: 4,
        precio: 1200,
        imagen: './img/iphone-12.png'
    },
    {
        modelo: "iPhone 11",
        codigo: 5,
        precio: 1100,
        imagen: './img/iphone-11.png'
    },
    {
        modelo: "iPhone XS",
        codigo: 6,
        precio: 900,
        imagen: './img/iphone-xs1.png'
    }
]

let carrito = [];

//AGG VAR LOCAL STORAGE.
const miLocalStorage = window.localStorage;

//variables DOM
const DOMcarrito = document.querySelector('#carrito');
const divisa = "US$";
const DOMsection_celus = document.querySelector("#section_celulares");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");


//funciones

function renderizar_productos() {
    baseDeDatosCelulares.forEach((celu) =>{
        //estructura
        const miNodo = document.createElement('article');
        miNodo.classList.add('justify_img','card', 'col-lg-4', 'col-md-6');

        //body nodo

        const nodoBody = document.createElement('div');
        nodoBody.classList.add('card-body', 'text-center');

        //titulo
        const miNodoTitulo = document.createElement('h4');
        miNodoTitulo.classList.add('card-title');
        miNodoTitulo.textContent = celu.modelo;

        //imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', celu.imagen);
        //precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${celu.precio}${divisa}`;

        const miNodoButton = document.createElement('button');
        miNodoButton.classList.add('btn', 'btn-primary');
        miNodoButton.textContent = 'Agregar al carrito';
        miNodoButton.setAttribute('marcador', celu.codigo);
        miNodoButton.addEventListener('click', agregarProductoAlCarrito);

        //insertamos
        nodoBody.appendChild(miNodoImagen);
        nodoBody.appendChild(miNodoTitulo);
        nodoBody.appendChild(miNodoPrecio);
        nodoBody.appendChild(miNodoButton);
        miNodo.appendChild(nodoBody);
        DOMsection_celus.appendChild(miNodo);
    })
}

/* ----------------------------------- */
/* ----------------------------------- */
/* ----------------------------------- */
/* ----------------------------------- */
/* ----------------------------------- */

//funciones carrito

function agregarProductoAlCarrito(evento) {
    // Añadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'));
    // Actualizamos el carrito 
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = "";
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatosCelulares.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.codigo === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].modelo} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'bt-eliminar', 'mx-5', 'my-2');
        miBoton.textContent = 'X';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/*
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */


/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
 function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatosCelulares.filter((itemBaseDatos) => {
            return itemBaseDatos.codigo === parseInt(item);
        });
        // Los sumamos al total. Para recordar: toFixed(2) hace que sean 2 numeros despues de la coma.
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    // Borra LocalStorage
    localStorage.clear();
}

function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

function buscar_por_modelo(modelo) { 
    modelo = modelo.toUpperCase();
    let  celulares_filtrados = celulares.filter(cel => cel.getModeloUpper().includes(modelo));
    return celulares_filtrados;
}

/* ------------------------------------------------------- */

function filtrar_celulares_por_precio(precioMin, precioMax) {
    let celulares_filtrados = [];
    baseDeDatosCelulares.forEach(cel => {
        let price = cel.precio;
        if((price >= precioMin) && (price <= precioMax)) {
            celulares_filtrados.push(cel);
        }
    })
    return celulares_filtrados;
}


function calcular_total(celus_filtrados) {
    let total = 0.0;
    celus_filtrados.forEach(cel => {
        precioConIva = cel.precio;
        alert(cel.modelo + ", precio: " + precioConIva);
        total+= precioConIva;
    });
    alert("el valor de todos los iphone en stock es de: " + (total) + " Dolares"); // se aplica el iva al precio final, no al de cada producto.
}

//codigo js
cargarCarritoDeLocalStorage();
renderizar_productos();
renderizarCarrito();


// let precioMin = prompt("ingrese precio minimo para filtrar los productos");
// let precioMax = prompt("ingrese precio máximo para filtrar los productos");

// console.log(precioMin);
// console.log(precioMax);

// let celus = filtrar_celulares_por_precio(precioMin, precioMax);

// console.log(celus);
// calcular_total(celus);

// let modelo = prompt("ingrese un modelo de iphone para la busqueda(cualquier coincidencia se mostrara)");
// console.log(buscar_por_modelo(modelo));



//export
