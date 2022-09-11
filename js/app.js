
//imports
// import Producto from "./producto.js"
class Celular {
    constructor(modelo, codigo,  precio) {
        this.modelo = modelo;
        this.codigo = codigo;
        this.precio = precio;
    }

    getPrecio() {
        return this.precio * 1.21;
    }
}

//variables
let celulares = []

celulares.push(new Celular('iPhone 14', '1', 1100))
celulares.push(new Celular('iPhone 13', '2', 899))
celulares.push(new Celular('iPhone 12 Pro Max', '3', 1050))
celulares.push(new Celular('iPhone 12', '4', 800))
celulares.push(new Celular('iPhone 11', '5', 747))
celulares.push(new Celular('iPhone XS', '6', 700))

let iva21 = 314.14

//funciones
function aleatorio(minimo,maximo){
    return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
}

function calcular_total() {
    total = 0.0;
    celulares.forEach(cel => {
        precioConIva = cel.getPrecio()
        alert(cel["modelo"] + ", precio con iva: " + precioConIva);
        total+= precioConIva;
    });
    alert("el valor de todos los iphone en stock es de: " + (total) + " Dolares") // se aplica el iva al precio final, no al de cada producto.
}


//codigo js

