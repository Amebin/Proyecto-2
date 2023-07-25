// emulamos mediante local storage el logueo de un paciente 
let pacienteLog;

function tomarDatosPaciente(){
    if (localStorage.getItem('pacienteLog')) {
        pacienteLog = JSON.parse(localStorage.getItem('pacienteLog'));
    } else {
        pacienteLog = [];
    }
}
tomarDatosPaciente()

const loguin = {
    estado : true,
    nombre: 'jacinto'
}

function modificarPacienteLog() {
    if (pacienteLog.length === 0){
        pacienteLog.push(loguin);
        localStorage.setItem(`pacienteLog`, JSON.stringify(pacienteLog));
        return
    } 
}

// llamamos la funcion
modificarPacienteLog();

export {pacienteLog};