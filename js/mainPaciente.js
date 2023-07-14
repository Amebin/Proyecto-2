// Funcion para mostrar el aside con las consultas de turnos
function mostrarAside() {
    document.getElementById('asideTurnos').style.display = 'block';
    document.getElementById('sectionSolicitar').style.display = 'none';
}

// Funcion para mostrar el section con el formulario para solicitar turnos
function mostrarSection() {
    document.getElementById('asideTurnos').style.display = 'none';
    document.getElementById('sectionSolicitar').style.display = 'block';
}

// creo el array vacio para luego pushear los objetos 
const turnosSolicitados = []; //agregar mediante push luego de traer los datos del form

// constantes necesarias para recibir los datos del form 
const formulario = document.querySelector('form');
const fechaTurno = document.getElementById('fechaTurno');
const especialidad = document.getElementById('especialidad');
const medico = document.getElementById('medico')
const horarios = document.getElementById('horarios')
const consulta = document.getElementById('consulta');

// creacion de listados especialidad, medico, horarios disponibles 
const especialista = [
    { formacion: 'clinico', nombre: 'Dr. Alfonso Diaz' },
    { formacion: 'urologo', nombre: 'Dr. Franco Gimenez' },
    { formacion: 'cardiologo', nombre: 'Dr. Lucas Gonzalez' },
    { formacion: 'Traumatologo', nombre: 'Dra. Liz Patiño' },
]

const am = ['08:00', '08:30', '09:00', '09:30'] 
const pm = ['16:00', '16:30', '17:00', '17:30']
const todos = am.concat(pm);

// constantes necesarias para escribir la card con los datos del turno 
/* const especialidadElegida = document.getElementById('especialidadElegida');
const fechaHora = document.getElementById('fechaHora');
const consultaIngresada = document.getElementById('consultaIngresada'); */

const cardTurnos = document.getElementById('cardTurnos');

// declaracion de eventos 
function cargarEspecialista() {

    for (let index = 0; index < especialista.length; index++) {
        const elemento = document.createElement('option');
        const esp = especialista[index];
        elemento.value = index;
        elemento.text = `${esp.formacion}`;
        especialidad.appendChild(elemento);
    }
}

//borra el desplegable de opciones del parametro que le indiquemos
function borrarOpciones(v) { 
    v.innerHTML = '';
}
// funcion para completar la card
function escribirCard() {
        cardTurnos.innerHTML = ''

        if(turnosSolicitados === 0){
            cardTurnos.innerHTML = 'No tienes turnos asignados en este momento'; 
        } else {

        for (let turno of turnosSolicitados){
            const elemento = document.createElement('div')
            
            elemento.innerHTML = `<div class="card text-center">
            <div class="card-header">
                <p id="especialidadElegida">Medico ${turno.especialidad}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title" id="fechaHora">${turno.fechaTurno} ${turno.horarios}</h5>

                <p class="card-text" id="consultaIngresada">${turno.consulta}</p>
                <a href="#" class="btn btn-primary">Modificar</a>
                <a href="#" class="btn btn-primary">Cancelar</a>
            </div>
            <div class="card-footer text-body-secondary">
                <p>Recuerde llegar 10 minutos antes de su turno para informarse en mesa de entrada</p>
            </div>
        </div>`
            cardTurnos.appendChild(elemento);
        }
    }
}


/*escucha los cambios en el desplegable especialidad, borra el listado 
ue posee y añade el nuevo segun la opcion indicada */
especialidad.addEventListener("change", function () {
    borrarOpciones(medico) //llamamos a la funcion borrar

    const elemento = document.createElement('option');
    elemento.value = especialidad.value;
    elemento.text = `${(especialista[especialidad.value]).nombre}`;
    medico.appendChild(elemento);
});

/* escucha los cambios en el desplegable medico, borra el listado y añade 
horarios disponibles en base al medico seleccionado*/
especialidad.addEventListener("change", function () {
    borrarOpciones(horarios) //llamamos a la funcion borrar
    for (let index = 0; index < am.length; index++){
        const elemento = document.createElement('option');
        
        function elegirTurno(){
            if ((medico.value)%3 === 0) {
                return todos[index+2]
            } else if ((medico.value)%2 === 1) {
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

    if (formulario.checkValidity()) { //el form esta listo para ser enviado
        const nuevoTurno = { //si se valida correctamente creo mi objeto y lo pusheo 
            fechaTurno: fechaTurno.value,
            especialidad: (especialista[especialidad.value]).formacion,
            medico: (especialista[medico.value]).nombre,
            horarios:horarios.value,
            consulta: consulta.value,
        }

        turnosSolicitados.push(nuevoTurno); //pusheamos los nuevos datos
        escribirCard()
        //reseteamos el form
       /*  borrarOpciones(medico)
        borrarOpciones(horarios)
        borrarOpciones(consulta)
        formulario.reset() */
        
    } else { // si no fue validado o dio error creamos una devolucion correspondiente
        console.log('Formulario error');
    }
})

// llamamos las funciones 
cargarEspecialista()



