import { db, collection, addDoc, getDocs, deleteDoc, doc } from './Firebase.js';
import { limpiar, validarCampos } from './Utilidad.js';
//No supe como hacer para un id y nombre no se repitiera y el boton de editar no me furulaba porque creo q habia conflictos entre ids o yo estaba importando mal las funciones de FireBase.
//19-06-2024 y son las 5.30 de la mañana... lo que dios quiera nomas.
window.limpiar = limpiar;

document.getElementById('registro-libros').addEventListener('submit', async (e) => {
    e.preventDefault();


    if (!validarCampos()) {
        return;
    }
    
    const libro = {
        ID_Libro: document.getElementById('ID_Libro').value,
        nombre_libro: document.getElementById('nombre-libro').value,
        nombre_autor: document.getElementById('nombre-autor').value,
        fecha_emision: document.getElementById('fecha-emision').value,
        valor_libro: document.getElementById('valor-libro').value,
        formato_libro: document.getElementById('Formato-libro').value,
        genero_libro: document.getElementById('genero-libro').value
    };

    try {
        const docRef = await addDoc(collection(db, "libros"), libro);
        console.log("Documento guardado con la siguiente ID: ", docRef.id);
        limpiar();
        obtenerLibros();
    } catch (e) {
        console.error("Error añadiendo documento: ", e);
    }
});

const obtenerLibros = async () => {
    const querySnapshot = await getDocs(collection(db, "libros"));
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const libro = doc.data();
        const fila = `
            <tr>
                <td>${libro.ID_Libro}</td>
                <td>${libro.nombre_libro}</td>
                <td>${libro.nombre_autor}</td>
                <td>${libro.fecha_emision}</td>
                <td>${libro.valor_libro}</td>
                <td>${libro.formato_libro}</td>
                <td>${libro.genero_libro}</td>
                <td>
                    <button class="btn btn-danger eliminar" data-id="${doc.id}">Eliminar</button>
                </td>
            </tr>
        `;
        contenido.insertAdjacentHTML('beforeend', fila);
    });

    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async () => {
            const libroId = boton.getAttribute('data-id');
            confirmarEliminacion(libroId);
        });
    });
};

const confirmarEliminacion = (libroId) => {
    Swal.fire({
        title: "¿Estás seguro de eliminar el registro?",
        text: "No podrás revertir los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarLibro(libroId);
        }
    });
};

const eliminarLibro = async (libroId) => {
    try {
        await deleteDoc(doc(db, "libros", libroId));
        console.log("Libro eliminado con ID:", libroId);
        obtenerLibros(); 
        Swal.fire({
            title: "Eliminado!",
            text: "Su registro ha sido eliminado",
            icon: "success"
        });
    } catch (error) {
        console.error("Error eliminando el libro:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al intentar eliminar el registro",
            icon: "error"
        });
    }
};

window.onload = obtenerLibros;
