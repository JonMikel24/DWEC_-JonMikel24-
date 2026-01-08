// btener palabra desde API
let  palabraSecreta = "";
fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
    .then(res => res.json())
    .then(data => {
        palabraSecreta = data[0].toUpperCase();
        console.log("Palabra del dia:", palabraSecreta);
    })
    .catch(() => {
        palabraSecreta = "ERROR";
        console.log("Error API, usando palabra:", palabraSecreta);
    });

let intento = 0;
let columna = 0;
let juegoTerminado = false;

// Crear tabla
const tabla = document.getElementById("tabla");
for (let i = 0; i < 30; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    tabla.appendChild(celda);
}

// Crear teclado
const teclado = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
const contTeclado = document.getElementById("teclado");

teclado.forEach(fila => {
    fila.split("").forEach(letra => {
        const tecla = document.createElement("div");
        tecla.textContent = letra;
        tecla.classList.add("tecla");
        tecla.onclick = () => presionarLetra(letra);
        contTeclado.appendChild(tecla);
    });
});

const enter = document.createElement("div");
enter.textContent = "ENTER";
enter.classList.add("tecla", "large");
enter.onclick = validarPalabra;
contTeclado.appendChild(enter); 

const borrar = document.createElement("div");
borrar.textContent = "DEL";
borrar.classList.add("tecla", "large");
borrar.onclick = borrarLetra;
contTeclado.appendChild(borrar);

// Metodos
function presionarLetra(letra) {
    if (juegoTerminado || columna >= 5 || !palabraSecreta) return;
    const celdas = document.querySelectorAll(".celda");
    celdas[intento * 5 + columna].textContent = letra;
    columna++;
}

function borrarLetra() {
    if (juegoTerminado || columna === 0) return;
    columna--;
    const celdas = document.querySelectorAll(".celda");
    celdas[intento * 5 + columna].textContent = "";
}

function validarPalabra() {
    if (columna < 5 || juegoTerminado || !palabraSecreta) return;

    const celdas = document.querySelectorAll(".celda");
    const intentoTexto = [];

    for (let i = 0; i < 5; i++) {
        intentoTexto.push(celdas[intento * 5 + i].textContent);
    }

    const copia = [...palabraSecreta];

    for (let i = 0; i < 5; i++) {
        if (intentoTexto[i] === palabraSecreta[i]) {
            celdas[intento * 5 + i].classList.add("correcta");
            colorearTecla(intentoTexto[i], "correcta");
            copia[i] = "_"; 
            intentoTexto[i] = "*";
        }
    }

    for (let i = 0; i < 5; i++) {
        if (copia.includes(intentoTexto[i])) {
            celdas[intento * 5 + i].classList.add("esta");
            colorearTecla(intentoTexto[i], "esta");
            copia[copia.indexOf(intentoTexto[i])] = "_";
        } else if (intentoTexto[i] !== "*") {
            celdas[intento * 5 + i].classList.add("fallo");
            colorearTecla(intentoTexto[i], "fallo");
        }
    }

    if (intentoTexto.join("") === "*****") {
        document.getElementById("mensaje").textContent = "Has ganado!";
        juegoTerminado = true;
        return;
    }

    intento++;
    columna = 0;

    if (intento === 6) {
        document.getElementById("mensaje").textContent = `Has Perdido | Era: ${palabraSecreta}`;
        juegoTerminado = true;
    }
}

function colorearTecla(letra, clase) {
    const teclas = document.querySelectorAll(".tecla");
    teclas.forEach(t => {
        if (t.textContent === letra) {
            if (clase === "correcta" || (clase === "esta" && !t.classList.contains("correcta"))) {
                t.classList.add(clase);
            } else if (!t.classList.contains("correcta") && !t.classList.contains("esta")) {
                t.classList.add("fallo");
            }
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (juegoTerminado) return;

    const key = event.key.toUpperCase();

    if (/^[A-ZÑ]$/.test(key) && key.length === 1) presionarLetra(key);
    if (key === "ENTER") validarPalabra();
    if (key === "BACKSPACE" || key === "DEL") borrarLetra();
});
