
// Funcion para mostrar el aside con las consultas de turnos
function mostrarAside() {
    document.getElementById('asideTurnos').style.display = 'block';
    document.getElementById('sectionSolicitar').style.display = 'none';
    escribirCard()
}

// Funcion para mostrar el section con el formulario para solicitar turnos
function mostrarSection() {
    document.getElementById('asideTurnos').style.display = 'none';
    document.getElementById('sectionSolicitar').style.display = 'block';
}

// sumo los datos del localStorage
let nombrePaciente;
if (localStorage.getItem('nombrePaciente')) {
    nombrePaciente = JSON.parse(localStorage.getItem('nombrePaciente'));
} else {
    nombrePaciente = [];
}

//saludo de bienvenida
const bienvenida = document.getElementById('bienvenido');

function darBienvenida() {
    bienvenida.innerHTML = `Bienvenido <b>@persona</b>`;
}
darBienvenida()

//constante para escribir el form 
const opcionesFrom = document.querySelectorAll('.opcionesFrom');

// constantes necesarias para recibir los datos del form 
const formulario = document.querySelector('form');
const fechaTurno = document.getElementById('fechaTurno');
const especialidad = document.getElementById('especialidad');
const medico = document.getElementById('medico')
const horarios = document.getElementById('horarios')
const consulta = document.getElementById('consulta');

// creacion de listados especialidad, medico, horarios disponibles 
const especialidades = ['clinico', 'urologo', 'xd', '1']
const especialista = [
    { nombre: 'Dr. Alfonso Diaz', turno: 'mañana', especialidad: 'clinico' },
    { nombre: 'Dra. Delfina Diaz', turno: 'tarde', especialidad: 'clinico' },
    { nombre: 'Dr. Izi Fercano', turno: 'hibrido', especialidad: 'clinico' },
    { nombre: 'Dr. Alfonso Diaz 2', turno: 'mañana', especialidad: 'urologo' },
    { nombre: 'Dra. Delfina Diaz 2', turno: 'tarde', especialidad: 'urologo' },
    { nombre: 'Dr. Izi Fercano 2', turno: 'hibrido', especialidad: 'urologo' },
    { nombre: 'Dr. Alfonso Diaz 3', turno: 'mañana', especialidad: 'xd' },
    { nombre: 'Dra. Delfina Diaz 3', turno: 'tarde', especialidad: 'xd' },
    { nombre: 'Dr. Izi Fercano 3', turno: 'hibrido', especialidad: 'xd' },
    { nombre: 'Dr. Alfonso Diaz 4', turno: 'mañana', especialidad: '1' },
    { nombre: 'Dra. Delfina Diaz 4', turno: 'tarde', especialidad: '1' },
    { nombre: 'Dr. Izi Fercano 4', turno: 'hibrido', especialidad: '1' },
    { nombre: 'Dr. Alfonso Diaz 5', turno: 'mañana', especialidad: '1' },
    { nombre: 'Dra. Delfina Diaz 5', turno: 'tarde', especialidad: '1' },
    { nombre: 'Dr. Izi Fercano 5', turno: 'hibrido', especialidad: '1' },
]

const am = ['08:00', '08:30', '09:00', '09:30']
const pm = ['16:00', '16:30', '17:00', '17:30']
const todos = am.concat(pm);

// constantes necesarias para escribir la card con los datos del turno 
const cardTurnos = document.getElementById('cardTurnos');

// constantes para toast de confirmacion
const toastConfirmacion = document.getElementById('toastConfirmacion');
const toastConfirmacionBts = bootstrap.Toast.getOrCreateInstance(toastConfirmacion);

//funcion borrar turno 
function borrarTurno(i) {
    nombrePaciente.splice(i, 1);
    localStorage.setItem(`nombrePaciente`, JSON.stringify(nombrePaciente));

    escribirCard();
};

// funcion para mostrar el resto del form despues de seleccionar el especialista
function mostrarForm(d) {
    opcionesFrom.forEach(el => {
        el.style.display = d;
    })
}

// cargamos el listado de especialistas
function cargarEspecialista() {
    for (let j = 0; j < especialidades.length; j++) {
        const elemento = document.createElement('option');
        const esp = especialidades[j];
        elemento.value = j;
        elemento.text = `${esp}`;
        especialidad.appendChild(elemento);
    }
}

//borra el desplegable de opciones del parametro que le indiquemos
function borrarOpciones(v) {
    v.innerHTML = '';
}

// funcion para completar la card
function escribirCard() {
    cardTurnos.innerHTML = '' //vaciamos la card

    if (nombrePaciente.length === 0) { //condiconal mas html de la card
        const elemento = document.createElement('div')

        elemento.innerHTML = `No tenes turnos asignados todavia`;
        cardTurnos.appendChild(elemento);
    } else {
        for (let turno of nombrePaciente) {
            const elemento = document.createElement('div')
            elemento.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3');

            elemento.innerHTML = `<div class="card text-center m-3">
            <div class="card-header">
                <p id="especialidadElegida" class="m-0">Medico ${turno.especialidad}</p>
                <p id="medico" class="m-0">${turno.medico}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title" id="fechaHora">${turno.fechaTurno} ${turno.horarios}</h5>

                <p class="card-text" id="consultaIngresada">${turno.consulta}</p>
                <button class="btn btn-danger btnBorrarTurno">Cancelar Turno</button>
            </div>
            <div class="card-footer text-body-secondary">
                <p>Recuerde llegar 10 minutos antes de su turno para informarse en mesa de entrada</p>
            </div>
        </div>`
            cardTurnos.appendChild(elemento);
        }
    }

    //constante para borrar y modificar turnos 
    const btnBorrarTurno = document.querySelectorAll('.btnBorrarTurno');

    //le agregamos la funcion al boton que se genera
    if (btnBorrarTurno.length > 1) {
        for (let i = 0; i < btnBorrarTurno.length; i++) {
            btnBorrarTurno[i].removeEventListener('click', () => { })
        }
    }

    for (let i = 0; i < btnBorrarTurno.length; i++) {
        btnBorrarTurno[i].addEventListener('click', () => {
            borrarTurno(i);
        });
    }
}

/*escucha los cambios en el desplegable especialidad, borra el listado 
que posee y añade el nuevo segun la opcion indicada */
especialidad.addEventListener("change", function () {
    borrarOpciones(medico) //llamamos a la funcion borrar
    const especialistas = especialista.filter(el => el.especialidad === especialidades[especialidad.value])
    for (let i = 0; i < especialistas.length; i++) {
        const elemento = document.createElement('option');
        elemento.value = i;
        elemento.text = `${especialistas[i].nombre}`;
        medico.appendChild(elemento);
    }
    mostrarForm('block');
});

// escucha los cambios en el desplegable especialidad (hasta subir los datos de medico), 
//borra el listado y añade 
//horarios disponibles en base al medico seleccionado
especialidad.addEventListener("change", function () {
    borrarOpciones(horarios) //llamamos a la funcion borrar


    for (let index = 0; index < am.length; index++) {
        const elemento = document.createElement('option');

        function elegirTurno() {
            if ((medico.value) % 3 === 0) {
                return todos[index]
            } else if ((medico.value) % 2 === 1) {
                return pm[index]
            } else {
                return am[index]
            }
        }
        const definirHora = elegirTurno()

        elemento.value = definirHora;
        elemento.text = `${definirHora}`;
        horarios.appendChild(elemento);

    }

});

// tomamos los datos del form al hacer submit
formulario.addEventListener('submit', function (event) {
    event.preventDefault()
    //crear un for con un condicional el cual pregunte si ya existe un turno asignado en ese horario
    // mediante los datos de medico, dia y horario 
    const turnoExistente = nombrePaciente.find(el => el.fechaTurno === fechaTurno.value && el.horarios === horarios.value && el.medico === (especialista[medico.value]).nombre);
    if (turnoExistente) {
        alert('Ya existe un turno en ese horario')
        return
    }

    if (formulario.checkValidity()) { //el form esta listo para ser enviado
        const nuevoTurno = { //si se valida correctamente creo mi objeto y lo pusheo 
            fechaTurno: fechaTurno.value,
            especialidad: especialidades[especialidad.value],
            medico: (especialista[medico.value]).nombre,
            horarios: horarios.value,
            consulta: consulta.value,
        }

        nombrePaciente.push(nuevoTurno); //pusheamos los nuevos datos

        // guardamos los datos en el local storage despues de pushearlos
        localStorage.setItem(`nombrePaciente`, JSON.stringify(nombrePaciente));

        //reseteamos el form
        mostrarForm('none');
        formulario.reset();

        toastConfirmacionBts.show();
    } else { // si no fue validado o dio error creamos una devolucion correspondiente
        console.log('Formulario error');
    }
})

// llamamos funcion cargar especialita
cargarEspecialista()




