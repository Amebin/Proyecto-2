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

// constantes necesarias para escribir la card con los datos del turno 
const especialidadElegida = document.getElementById('especialidadElegida');
const fechaHora = document.getElementById('fechaHora');
const consultaIngresada = document.getElementById('consultaIngresada');

// declaracion de eventos 
formulario.addEventListener('submit', function(event){
    event.preventDefault()

    if (formulario.checkValidity()){ //el form esta listo para ser enviado
        const nuevoTurno = { //si se valida correctamente creo mi objeto y lo pusheo 
            fechaTurno: fechaTurno.value,
            especialidad: especialidad.value,
            medico: medico.value,
            horarios: horarios.value,
            consulta: consulta.value,
        }
        turnosSolicitados.push(nuevoTurno);

        especialidadElegida.innerHTML = ''; //vacio los campos 
        fechaHora.innerHTML = '';
        consultaIngresada.innerHTML = '';
        for (turno of turnosSolicitados) { //escribo info en la card basico
            especialidadElegida.innerHTML = `${turno.especialidad}`
            fechaHora.innerHTML = `${turno.fechaTurno} ${turno.horarios}`
            consultaIngresada.innerHTML = `${turno.consulta}`
        }


        } else { // si no fue validado o dio error creamos una devolucion correspondiente
        console.log('Formulario error');
    }
})



