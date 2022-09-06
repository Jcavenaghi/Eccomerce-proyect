
//imports
// import Producto from "./producto.js"
class Producto {
    constructor(nombre, codigo,  precio) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
    }

}

//variables
let productos = []
let iva21 = 314.14

//funciones
function aleatorio(minimo,maximo){
    return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
}

function calcular_total() {
    total = 0.0;
    productos.forEach(prod => {
        total+= prod["precio"]
    });

    alert("el total es: " + (total + iva21) + " Dolares") // se aplica el iva al precio final, no al de cada producto.
}


//codigo js

for (let i = 0; i < 5; i++) {
    producto  = new Producto ('Iphone' + i, "Iphone: AAA" + i, aleatorio(100, 100000));
    productos.push(producto);
}
