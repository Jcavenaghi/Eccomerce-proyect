let numero_teclado =  prompt("Ingresar un numero: ");
let numero_arreglo = numero_teclado;
let array_numeros = [];
for (let i = 0; i < 5; i++) {
    numero_arreglo++;
    array_numeros.push(numero_arreglo);
}

alert("Los 5 numeros siguientes del número " + numero_teclado + " son: " + array_numeros.toString());
console.log("Los 5 numeros siguientes del número " + numero_teclado + " son: " + array_numeros.toString());