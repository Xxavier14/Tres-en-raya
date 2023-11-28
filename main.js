const enes = document.querySelectorAll(".n");
const flotante = document.querySelector('#flotante')
const colorJugador = document.querySelector('.Ganador')
const container = document.querySelector('.container')
const tutorial = document.querySelector('.bienvenida')
const turnoActual = document.querySelector('#turnoActual')
let turnoRojo = true; // Inicializa la variable de turno


function verificarGanador(color) {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columnas
        [0, 4, 8], [2, 4, 6]              // Diagonales
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (
            enes[a].style.backgroundColor === color &&
            enes[b].style.backgroundColor === color &&
            enes[c].style.backgroundColor === color
        ) {
            return true;
        }
    }

    return false;
}

function limpiar() {
    enes.forEach(element => {
        element.style.backgroundColor = '';
        flotante.style.display = 'none';
    });
}


container.style.display = 'none';
function mostrar() {

    container.style.display = '';
    tutorial.style.display = 'none'
}

function turno (turno){
    if (turno === 'red'){
    turnoActual.textContent = 'Rojo'
    turnoActual.style.color = 'red'
    } else if ( turno === 'blue'){
        turnoActual.textContent = 'Azul'
        turnoActual.style.color = 'blue'
    }
}

tutorial.addEventListener('click', mostrar)


enes.forEach(element => {
    element.addEventListener('click', function () {
        if (turnoRojo && element.style.backgroundColor === '') {
            element.style.backgroundColor = 'red';
            turno('blue')
            if (verificarGanador('red')) {
                colorJugador.textContent = 'Rojo';
                colorJugador.style.color = 'red';
                flotante.style.display = 'initial';
                setTimeout(limpiar, 1200)
                turnoRojo = true;
            }
            event.preventDefault();
            turnoRojo = !turnoRojo;
        }
        event.preventDefault();
    });

    element.addEventListener('contextmenu', function (event) {
        if (!turnoRojo && element.style.backgroundColor === '') {
            element.style.backgroundColor = 'blue';
            turno('red')
            if (verificarGanador('blue')) {
                colorJugador.textContent = 'Azul';
                colorJugador.style.color = 'blue';
                flotante.style.display = 'initial';
                setTimeout(limpiar, 1200)
            }
            turnoRojo = !turnoRojo;
        }
        event.preventDefault();
    });
});
