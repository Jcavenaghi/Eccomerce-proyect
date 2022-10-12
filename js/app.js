let carrito = [];

//AGG VAR LOCAL STORAGE.
const miLocalStorage = window.localStorage;

//variables DOM
const DOMcarrito = document.querySelector('#carrito');
const divisa = "US$";
const DOMsection_celus = document.querySelector("#section_celulares");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");
const DOMbotonRealizarCompra = document.querySelector("#boton-comprar");


//funciones

const renderizar_todos = async () => {
    const res = await fetch('../json/data.json')
    const data = await res.json()
    data.forEach((celu) => {
        renderizar_productos(celu)
    }) 
} 
function renderizar_productos(celu) {
        //estructura
        const miNodo = document.createElement('article');
        miNodo.classList.add('card', 'justify__img', 'col-xl-4', 'col-md-6');

        //body nodo

        const nodoBody = document.createElement('div');
        nodoBody.classList.add( 'card-body','text-center');

        //titulo
        const miNodoTitulo = document.createElement('h4');
        miNodoTitulo.classList.add('card-title');
        miNodoTitulo.textContent = celu.modelo;

        //imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('mx-auto', 'd-block');
        miNodoImagen.setAttribute('src', './img/iphone-cod'+ celu.codigo + '.png');
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
        // nodoBody.appendChild(miNodoImagen);
        nodoBody.appendChild(miNodoTitulo);
        nodoBody.appendChild(miNodoPrecio);
        nodoBody.appendChild(miNodoButton);
        miNodo.appendChild(miNodoImagen);
        miNodo.appendChild(nodoBody);
        DOMsection_celus.appendChild(miNodo);
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

 const renderizarCarrito = async () => {
    const res = await fetch('../json/data.json')
    const data = await res.json()
    // Vaciamos todo el html
    DOMcarrito.textContent = "";
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = data.filter((itemBaseDatos) => {
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
    DOMtotal.textContent = await calcularTotal();
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

 const calcularTotal = async () => {
    const res = await fetch('../json/data.json')
    const data = await res.json()
   // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = data.filter((itemBaseDatos) => {
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
DOMbotonRealizarCompra.addEventListener('click',() => {
    console.log(carrito);
    carrito.length == 0 ? 
        swal({
            title: "No hay articulos en el carrito",
            icon: "error",
            button: "Salir",
        })
    :
        swal({
            title: "Compra realizada!",
            text: "Se ha realizado la compra de los articulos satisfactoriamente.",
            icon: "success",
            button: "Continuar",
        })
        vaciarCarrito();
})

function buscar_por_modelo(modelo) { 
    modelo = modelo.toUpperCase();
    let  celulares_filtrados = celulares.filter(cel => cel.getModeloUpper().includes(modelo));
    return celulares_filtrados;
}

/* ------------------------------------------------------- */

function filtrar_celulares_por_precio(precioMin, precioMax) {
    DOMsection_celus.textContent = ""
    baseDeDatosCelulares.forEach(celu => {
        let price = cel.precio;
        ((price >= precioMin) && (price <= precioMax)) ?? renderizar_productos(celu);
    })
    return celulares_filtrados;
}
//codigo js
cargarCarritoDeLocalStorage();
renderizar_todos();
renderizarCarrito();
