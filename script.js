let palabraOriginal = "";
let palabraDesordenada = "";
let errores = 0;
let aciertos = 0;
let juegosExitosos = 0;
let casillaActual = 0;

function PalabraOriginal() {
    let palabras = ["manos", "mesas", "perro", "lapiz", "piano", "feliz", "jugar", "tigre"];
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function desordenarPalabra(palabraOriginal) {
    const letras = palabraOriginal.split('');
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    return letras.join('');
}

function actualizarPalabra() {
    palabraOriginal = PalabraOriginal();
    palabraDesordenada = desordenarPalabra(palabraOriginal);
    document.getElementById("palabraDesordenada").textContent = palabraDesordenada;
    casillaActual = 0;
    habilitarCasilla(0);
}

function reiniciarInputs() {
    const casillas = document.querySelectorAll(".Casilla");
    casillas.forEach((casilla) => {
        casilla.value = "";
        casilla.style.backgroundColor = "";
        casilla.removeAttribute("disabled");
    });
}

function habilitarCasilla(index) {
    const casillas = document.querySelectorAll(".Casilla");
    if (index < casillas.length) {
        casillas[index].removeAttribute("disabled");
        casillas[index].focus();
    }
}

function reiniciarJuego() {
    errores = 0;
    aciertos = 0;
    document.getElementById("error-cant").textContent = errores;
    actualizarPalabra();
    reiniciarInputs();
}

function verificarVictoria() {
    if (aciertos >= 5) {
        juegosExitosos++;
        document.getElementById("acertadas").textContent = juegosExitosos;
        if (juegosExitosos === 5) {
            alert("¡Felicidades, lo lograste!");
            juegosExitosos = 0;
        }
        reiniciarJuego();
    }
}

actualizarPalabra();

const casillas = document.querySelectorAll(".Casilla");
casillas.forEach((casilla, index) => {
    casilla.addEventListener("input", function () {
        const letraIngresada = this.value.toLowerCase();
        const letraCorrecta = palabraOriginal[index];

        if (letraIngresada !== letraCorrecta) {
            errores++;
            this.style.backgroundColor = "crimson";
        } else {
            this.style.backgroundColor = "lightgreen";
            this.setAttribute("disabled", "true");
            aciertos++;
            verificarVictoria();
            casillaActual++;
            habilitarCasilla(casillaActual);
            if (aciertos === palabraOriginal.length) {
                reiniciarInputs();
            }
        }

        document.getElementById("error-cant").textContent = errores;

        if (errores >= 5) {
            reiniciarJuego();
        }
    });

    casilla.addEventListener("keydown", function (e) {
        if (e.key == Backspace && index > 0) {
            if (this.value === "") {
                casillas[index - 1].focus();
            } else {
                e.preventDefault();
            }
        }
    });
});

document.getElementById("reset-button").addEventListener("click", reiniciarJuego);

document.getElementById("nueva-button").addEventListener("click", function () {
    reiniciarJuego();
});
