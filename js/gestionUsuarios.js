let listaPersonas;
if (localStorage.getItem('ListaPersonas')) {
    listaPersonas = JSON.parse(localStorage.getItem('ListaPersonas'));
} else {
    listaPersonas = [];
}


const tablaBody = document.getElementById('userTableBody');
// Función para generar la tabla de usuarios
function generarTablaUsuarios() {
    // Limpiamos la tabla antes de volver a generarla
    tablaBody.innerHTML = '';
    
    if(Object.keys(listaPersonas).length === 0){
        const fila = document.createElement('tr');

        fila.innerHTML = `No tenes usuarios registrados todavia`;
        tablaBody.appendChild(fila);
    }else {
        Object.keys(listaPersonas).forEach((personaId, index) => {
            const persona = listaPersonas[personaId];
            const fila = document.createElement('tr');
            fila.innerHTML = `
              <td>${index + 1}</td>
              <td>${persona.nombre}</td>
              <td>${persona.email}</td>
              <td>${persona.acceso ? 'Aprobado' : 'Denegado'}</td>
              <td>
                <button class="btn btn-danger btn-sm mr-2" onclick="eliminarUsuario('${personaId}')">Borrar</button>
                <button class="btn btn-primary btn-sm" onclick="cambiarAcceso('${personaId}')">
                  ${persona.acceso ? 'Denegar Acceso' : 'Aprobar Acceso'}
                </button>
              </td>
            `;
        
            tablaBody.appendChild(fila);
          });
    }

    
}

// Función para eliminar un usuario
function eliminarUsuario(personaId) {
    const listaPersonas = cargarUsuarios();
    delete listaPersonas[personaId];
    guardarUsuarios(listaPersonas);
    generarTablaUsuarios();
}

// Función para cambiar el estado de acceso de un usuario
function cambiarAcceso(personaId) {
    const listaPersonas = cargarUsuarios();
    listaPersonas[personaId].acceso = !listaPersonas[personaId].acceso;
    guardarUsuarios(listaPersonas);
    generarTablaUsuarios();
}

// Generamos la tabla de usuarios al cargar la página
generarTablaUsuarios();
