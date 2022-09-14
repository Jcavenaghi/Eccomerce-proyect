
//imports
// import Producto from "./producto.js"
class Celular {
    constructor(modelo, codigo,  precio) {
        this.modelo = modelo;
        this.codigo = codigo;
        this.precio = precio;
        this.imagen = './img/celu.png';
    }

    getPrecio() {
        return this.precio;
    }

    getModeloUpper() {
        return this.modelo.toUpperCase();
    }
}


class Computadora { //completar
    constructor(modelo, codigo, precio, ) {
        this.modelo = modelo;
        this.codigo = codigo;
        this.precio = precio;
    }

    getPrecio() {
        return this.precio;
    }

    getModeloUpper() {
        return this.modelo.toUpperCase();
    }
}

//variables
let celulares = [];

let computadoras = [];

celulares.push(new Celular('iPhone 14', '1', 2100));
celulares.push(new Celular('iPhone 13', '2', 1700));
celulares.push(new Celular('iPhone 12 Pro Max', '3', 1550));
celulares.push(new Celular('iPhone 12 Pro', '3', 1350));
celulares.push(new Celular('iPhone 12', '4', 1200));
celulares.push(new Celular('iPhone 11', '5', 1100));
celulares.push(new Celular('iPhone XS', '6', 900));


computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));
computadoras.push(new Computadora('iPhone XS', '6', 900));


let carrito = [];
//variables DOM
const divisa = "US$";
const DOMsection_celus = document.querySelector("#section_celulares");

//funciones

function renderizar_productos() {
    celulares.forEach((celu) =>{
        //estructura
        const miNodo = document.createElement('article');
        miNodo.classList.add('justify_img', 'col-lg-4', 'col-md-6');

        //body nodo

        const nodoBody = document.createElement('div');
        nodoBody.classList.add('card-body', 'text-center');

        //titulo
        const miNodoTitulo = document.createElement('h4');
        miNodoTitulo.classList.add('card-title');
        miNodoTitulo.textContent = celu["modelo"];

        //imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', celu["imagen"]);
        //precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${celu["precio"]}${divisa}`;

        const miNodoButton = document.createElement('button');
        miNodoButton.classList.add('btn', 'btn-primary');
        miNodoButton.textContent = 'Agregar al carrito';
        miNodoButton.setAttribute('marcador', celu["codigo"]);
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


/**
 * Evento para añadir un producto al carrito de la compra
 */
 /* ---------------------------------------------------- */


 function agregarProductoAlCarrito(evento) {
    // Añadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

// function filtrar_pc_o_celures(filtro) {
//     if (filtro == "celulares") {
//         return celulares;
//     } 
//     return computadoras;
// }



function buscar_por_modelo(modelo) { 
    modelo = modelo.toUpperCase();
    let  celulares_filtrados = celulares.filter(cel => cel.getModeloUpper().includes(modelo));
    return celulares_filtrados;
}

/* ------------------------------------------------------- */

function filtrar_celulares_por_precio(precioMin, precioMax) {
    let celulares_filtrados = [];
    celulares.forEach(cel => {
        let price = cel.getPrecio();
        if((price >= precioMin) && (price <= precioMax)) {
            celulares_filtrados.push(cel);
        }
    })
    return celulares_filtrados;
}


function calcular_total(celus_filtrados) {
    let total = 0.0;
    celus_filtrados.forEach(cel => {
        precioConIva = cel.getPrecio();
        alert(cel["modelo"] + ", precio: " + precioConIva);
        total+= precioConIva;
    });
    alert("el valor de todos los iphone en stock es de: " + (total) + " Dolares"); // se aplica el iva al precio final, no al de cada producto.
}


//codigo js


renderizar_productos();

let precioMin = prompt("ingrese precio minimo para filtrar los productos");
let precioMax = prompt("ingrese precio máximo para filtrar los productos");

console.log(precioMin);
console.log(precioMax);

let celus = filtrar_celulares_por_precio(precioMin, precioMax);

console.log(celus);
calcular_total(celus);

let modelo = prompt("ingrese un modelo de iphone para la busqueda(cualquier coincidencia se mostrara)");
console.log(buscar_por_modelo(modelo));
