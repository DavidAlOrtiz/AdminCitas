// seleccionamos todos los formularios 

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');

const citasCont = document.querySelector('#citas');

let editando;

class Citas{
    constructor(){
        this.citas = []
    }
    agregarCitaC(cita){
        this.citas = [...this.citas, cita]
    }
    eiliminaCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
}
class UI{
    imprimirAlerta(mensaje,tipo){
        //creamos el div
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', 'alert', 'd-block',  'col-12');

        if(tipo==='error'){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
        }
        divAlerta.textContent = mensaje;

        //se agrega al dom
        
       const docum = document.querySelector('#contenido').insertBefore(divAlerta,document.querySelector('.agregar-cita'));
       setTimeout(()=>{
            divAlerta.remove();
        },5000);
    }
    imprimirCita({citas}){
        
        this.limpiarHtml()
        citas.forEach(cita => {
            
            
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            console.log(mascota)
            const citaDiv = document.createElement('div');
            citaDiv.classList.add('cita','p-3');
            citaDiv.dataset.id = id;

            //
            const parrafoMascota = document.createElement('h2');
            parrafoMascota.classList.add('card-title', 'font-weigth-bold');
            parrafoMascota.textContent = mascota

            const propietarioP = document.createElement('p');
            propietarioP.innerHTML = `<span class=" font-weigth-bolder">Propietario:</span> ${propietario}`

            const telefonoP = document.createElement('p');
            telefonoP.innerHTML = `<span class=" font-weigth-bolder">Telefono:</span> ${telefono}`
            const FechaP = document.createElement('p');
            FechaP.innerHTML = `<span class=" font-weigth-bolder">Fecha:</span> ${fecha}`

            const HoraP = document.createElement('p');
            HoraP.innerHTML = `<span class=" font-weigth-bolder">Hora:</span> ${hora}`

            const sintomasP = document.createElement('p');
            sintomasP.innerHTML = `<span class=" font-weigth-bolder">Sintomas:</span> ${sintomas}`
            
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>'   ;
            btnEliminar.onclick = () => eliminarCita(id)

            //btan editar
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn','btn-info')
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>`
            btnEditar.onclick = () => cargarCita(cita);

            //Agregamos la cita al parrafo de citas
            citaDiv.appendChild(parrafoMascota);
            citaDiv.appendChild(propietarioP);
            citaDiv.appendChild(telefonoP);
            citaDiv.appendChild(FechaP);
            citaDiv.appendChild(HoraP);
            citaDiv.appendChild(sintomasP);
            citaDiv.appendChild(btnEliminar);
            citaDiv.appendChild(btnEditar)
            //Agregamos las citas al contenedor
            
            citasCont.appendChild(citaDiv)
            console.log(citasCont)
            
        })
    }
    limpiarHtml(){
        while(citasCont.firstChild){
            citasCont.removeChild(citasCont.firstChild)
        }
    }
}

const ui = new UI();
const administracion = new Citas();

eventListener();

function eventListener(){

    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita); 

    formulario.addEventListener('submit', agregarCita);

}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono : '',
    fecha: '',
    hora: '',
    sintomas: ''
}

function datosCita(e){
    e.preventDefault();
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

function agregarCita(e){
    e.preventDefault();

    //const tomamos los valores 
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    //

    if(mascota === '' || propietario === '' ||telefono ==='' || fecha==='' || hora ==='' || sintomas===''){
        ui.imprimirAlerta("Todos los datos son obligatorios","error")
        return;
    }
    
    if(editando){
        ui.imprimirAlerta("Se editado correctamente");
        formulario.querySelector('button').textContent = "Crear Cita";
        editando = false;
    }else{
        citaObj.id = Date.now();
        administracion.agregarCitaC({...citaObj});
        ui.imprimirAlerta("Se agrego correctamente");
    }

    reiniciarObjeto();
    formulario.reset();

    ui.imprimirCita(administracion);

   
}

function reiniciarObjeto(){
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.sintomas = "";
    citaObj.telefono= "";
}

function eliminarCita(id){
   administracion.eiliminaCita(id);
   ui.imprimirAlerta("La cita se elimino correctamente");
   ui.imprimirCita(administracion);
}

function cargarCita(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas,id } = cita
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;


    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.sintomas = sintomas;
    citaObj.telefono= telefono;
    citaObj.id = id;
    //se cambia el texto del boton

    formulario.querySelector('button').textContent = "Guardar Cambios";

    editando = true;

}