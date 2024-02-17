const canvas = document.getElementById('tablero');
const toggleAjusteXY = document.getElementById('toggleAjusteXY');
const formaVector = document.querySelector('.formaVector');
const ejeX = document.getElementById('ejeX');
const ejeY = document.getElementById('ejeY');
const ctx = canvas.getContext('2d');
const filas = 10;
const columnas = 10;
const anchoCasilla = canvas.width / columnas;
const altoCasilla = canvas.height / filas;
let posX = filas / 2;
let posY = columnas / 2;
let ajusteXY = false; // Estado inicial del ajuste de xy

// Función para actualizar el texto del botón basado en el estado del ajuste
function actualizarTextoBoton() {
    const boton = document.getElementById('toggleAjusteXY');
    boton.textContent = ajusteXY ? "Ajuste de xy: On" : "Ajuste de xy: Off";
}

// Event listener para el botón de ajuste de xy
document.getElementById('toggleAjusteXY').addEventListener('click', () => {
    ajusteXY = !ajusteXY; // Cambia el estado del ajuste
    actualizarTextoBoton();
    if (ajusteXY) {
        formaVector.innerText = "(y,x)";
    } else {
        formaVector.innerText = "(x,y)";
    }
    
    dibujarTablero(); // Redibuja el tablero para reflejar el cambio de ajuste
});

// Dibuja el tablero inicial
function dibujarTablero() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            ctx.strokeRect(j * anchoCasilla, i * altoCasilla, anchoCasilla, altoCasilla);
        }
    }
    // Marca la posición inicial
    ctx.fillStyle = 'red';
    ctx.fillRect(posY * anchoCasilla, posX * altoCasilla, anchoCasilla, altoCasilla);
}

// Calcula y muestra los vectores de movimiento
function mostrarVector(x, y) {
    // Calcula la fila y columna basándose en la posición del mouse
    const filaHover = Math.floor(y / altoCasilla);
    const columnaHover = Math.floor(x / anchoCasilla);

    // Calcula el vector de movimiento
    const vectorX = columnaHover - posY;
    const vectorY = filaHover - posX;

    // Actualiza el tablero para mostrar el vector
    dibujarTablero();

    // Dibuja la línea del vector
    ctx.beginPath();
    ctx.moveTo(posY * anchoCasilla + anchoCasilla / 2, posX * altoCasilla + altoCasilla / 2);
    ctx.lineTo((posY + vectorX) * anchoCasilla + anchoCasilla / 2, (posX + vectorY) * altoCasilla + altoCasilla / 2);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Muestra el texto del vector en la casilla sobre la que se hace hover
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    let desplazamientoTextoX = `Pos X siguiente = Pos Actual X (${posX}) + ${vectorY}`;
    let desplazamientoTextoY = `Pos Y siguiente = Pos Actual Y (${posY}) + ${vectorX}`;
    if (ajusteXY)  {
        ctx.fillText(`(${vectorX}, ${vectorY * -1})`, (columnaHover * anchoCasilla) + 5, (filaHover * altoCasilla) + 20);
        desplazamientoTextoX = `Pos X siguiente = Pos Actual X (${posX}) + ${vectorX}`;
        desplazamientoTextoY = `Pos Y siguiente = Pos Actual Y (${posY}) + ${vectorY * -1}`;
    } else {
        ctx.fillText(`(${vectorY}, ${vectorX})`, (columnaHover * anchoCasilla) + 5, (filaHover * altoCasilla) + 20);
        desplazamientoTextoX = `Pos X siguiente = Pos Actual X (${posX}) + ${vectorY}`;
        desplazamientoTextoY = `Pos Y siguiente = Pos Actual Y (${posY}) + ${vectorX}`;
    }

    // Actualiza el texto del desplazamiento 
    
    document.querySelector('.desplazamiento.x').innerText = desplazamientoTextoX;
    document.querySelector('.desplazamiento.y').innerText = desplazamientoTextoY;
    
}


// Añade un event listener para manejar el evento hover
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mostrarVector(x, y);
});

canvas.addEventListener('mouseleave', () => {
    ctx.strokeStyle = 'black';
    document.querySelector('.desplazamiento.x').innerText = '';
    document.querySelector('.desplazamiento.y').innerText = '';
    dibujarTablero(); // Simplemente redibuja el tablero sin ningún vector o texto
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const columnaClic = Math.floor(x / anchoCasilla);
    const filaClic = Math.floor(y / altoCasilla);

    // Actualiza la posición actual basada en el ajuste XY
    if (ajusteXY) {
        posX = filaClic;
        posY = columnaClic;
    } else {
        posX = filaClic;
        posY = columnaClic;
    }
    mostrarVector(x, y);
    //dibujarTablero(); // Redibuja el tablero con la nueva posición
});



// Inicializa el tablero
dibujarTablero();
