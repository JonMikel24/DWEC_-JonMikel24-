// 1
let precio = prompt("Precio del producto:");
let iva = prompt("IVA (%):");
let total = precio * 1 + (precio * iva / 100);
console.log("Precio total:", total);

// 2
let lado = prompt("Lado del cuadrado:");
let area = lado * lado;
let perimetro = 4 * lado;
console.log("Área:", area, "Perímetro:", perimetro);

// 3
let a = prompt("Primer número:");
let b = prompt("Segundo número:");
if (b == 0) {
    console.log("Error: no se puede dividir entre cero");
} else {
    console.log("Cociente:", a / b);
}

// 4
let x = prompt("Primer número:");
let y = prompt("Segundo número:");
console.log("Diferencia:", Math.abs(x - y));

// 5
let cantidad = prompt("Número de artículos:");
let precioUnit = prompt("Precio unitario:");
let totalPagar = cantidad * precioUnit;
if (cantidad > 10 && precioUnit > 40) {
    totalPagar *= 0.85;
}
console.log("Total a pagar:", totalPagar);

// 6
let n = prompt("Teclea un número entre 1 y 5:");
while (n < 1 || n > 5) {
    n = prompt("Número fuera de rango, inténtalo otra vez:");
}
console.log("Número válido:", n);

// 7
let num = prompt("Teclea un número:");
let esPrimo = true;
if (num <= 1) esPrimo = false;
for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
        esPrimo = false;
        break;
    }
}
console.log("Es primo:", esPrimo);

// 8
let numeros = [];
while (true) {
    let n2 = prompt("Teclea un número (0 para terminar):");
    if (n2 == 0) break;
    numeros.push(Number(n2));
}
console.log("Máximo:", Math.max(...numeros));
console.log("Mínimo:", Math.min(...numeros));

// 9
let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
let diaNum = prompt("Teclea un número entre 0 y 6:");
console.log("Día:", dias[diaNum]);

// 10
function sumaLista(lista) {
    let suma = 0;
    for (let i = 0; i < lista.length; i++) {
        suma += lista[i];
    }
    return suma;
}
console.log(sumaLista([1, 2, 3, 4, 5]));

// 11
function esVocal(letra) {
    let vocales = ['a', 'e', 'i', 'o', 'u'];
    return vocales.includes(letra.toLowerCase());
}
console.log(esVocal('A'));

// 12
function unirArray(arr) {
    return arr.join("-");
}
console.log(unirArray(["uno", "dos", "tres"]));

// 13
function precioProducto(producto) {
    let productos = [
        ["monitor", 150],
        ["teclado", 40],
        ["raton", 25]
    ];
    for (let i = 0; i < productos.length; i++) {
        if (productos[i][0] === producto) {
            return productos[i][1];
        }
    }
    return "Producto no encontrado";
}
console.log(precioProducto("teclado"));
