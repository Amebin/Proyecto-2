const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

//================================================================================
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    especialidad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    matricula: /^\d{3,14}$/, // 7 a 14 numeros.
    domicilio: /^[a-zA-Z0-9\s\:]{4,40}$/, // Letras y numeros .
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo.
	password: /^.{4,12}$/, // 4 a 12 digitos.
}

//================================================================================

//Poscion del campo
const campos = {
	nombre: false,
	apellido: false,
    especialidad: false,
    matricula: false,
    domicilio: false,
	telefono: false,
	correo: false,
    usuario: false,
	password: false,
}

//================================================================================

//contructor de objeto
class Medico {
	constructor(nombre, apellido, especialidad, matricula, domicilio, telefono, correo, usuario, password, password2){
		this.nombre = nombre;
		this.apellido = apellido;
		this.especialidad = especialidad;
		this.matricula = matricula;
		this.domicilio = domicilio;
		this.telefono = telefono;
		this.correo = correo;
		this.usuario = usuario;
		this.password = password;
		this.password2 = password2;
	}
}
//================================================================================

const validarFormulario = (evento) => {
	switch (evento.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, evento.target, 'nombre');			
        break;
        case "apellido":
            validarCampo(expresiones.apellido, evento.target, 'apellido');			
        break;
        case "especialidad":
            validarCampo(expresiones.especialidad, evento.target, 'especialidad');
        break;
        case "matricula":
            validarCampo(expresiones.matricula, evento.target, 'matricula');			
        break;
        case "domicilio":
            validarCampo(expresiones.domicilio, evento.target, 'domicilio');			
        break;
        case "telefono":
            validarCampo(expresiones.telefono, evento.target, 'telefono');			
        break;
		case "correo":
			validarCampo(expresiones.correo, evento.target, 'correo');			
		break;
		case "usuario":
			validarCampo(expresiones.usuario, evento.target, 'usuario');			
		break;
        case "password":
            validarCampo(expresiones.password, evento.target, 'password');			
            validarPassword2();
			
        break;
        case "password2":
			validarPassword2();			
        break;
    }	
}

//================================================================================
// funcion para validar los campos
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

//================================================================================

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

//================================================================================

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

//================================================================================

formulario.addEventListener('submit', (evento) => {
	evento.preventDefault();
	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.especialidad && campos.matricula && campos.domicilio && campos.telefono && campos.correo && campos.usuario && campos.password && terminos.checked){
		const nombre = document.getElementById('nombre').value;
		const apellido = document.getElementById('apellido').value;
		const especialidad = document.getElementById('especialidad').value;
		const matricula = document.getElementById('matricula').value;
		const domicilio = document.getElementById('domicilio').value;
		const telefono = document.getElementById('telefono').value;
		const correo = document.getElementById('correo').value;
		const usuario = document.getElementById('usuario').value;
		const password = document.getElementById('password').value;
		const password2 = document.getElementById('password2').value;
		//Crea un nuevo objeto medico
		const Nuevomedico = new Medico (nombre, apellido, especialidad, matricula, domicilio, telefono,correo, usuario, password, password2);
		
		localStorage.setItem('ListaMedicos', JSON.stringify(Nuevomedico)); // almacena el Obejto 
		
		formulario.reset(); // Pone en blanco el formulario
		
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
