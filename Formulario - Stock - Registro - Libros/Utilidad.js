export const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById('e-' + item.name).innerHTML = '';
    });
    document.getElementById('ID_Libro').readOnly = false;
    document.getElementById('guardar-libro').value = 'Guardar Libro';
};

export const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);

    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    div.innerHTML = '';

    if (input.value.trim() === '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">Este campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';

        if (id === 'Formato-libro') {
            const formatoValido = ['Físico', 'Digital'];
            if (!formatoValido.includes(input.value.trim())) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">Formato no válido. Debe ser Físico o Digital</span>';
            }
        }
        if (id === 'nombre-libro' && input.value.trim().length > 30) {
            input.classList.add('is-invalid');
            div.innerHTML = '<span class="badge bg-danger">Haz sobrepasado el límite de 30 caracteres</span>';
        } else if (id === 'nombre-autor' && input.value.trim().length > 20) {
            input.classList.add('is-invalid');
            div.innerHTML = '<span class="badge bg-danger">Haz sobrepasado el límite de 30 caracteres</span>';
        } else if (id === 'genero-libro' && input.value.trim().length > 20) {
            input.classList.add('is-invalid');
            div.innerHTML = '<span class="badge bg-danger">Haz sobrepasado el límite de 30 caracteres</span>';
        }
    }
};

export const validarCampos = () => {
    let isValid = true;

    const inputs = document.querySelectorAll('#registro-libros input[type="text"], #registro-libros input[type="number"], #registro-libros input[type="date"]');
    
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        Swal.fire({
            title: "Campos Vacíos",
            text: "Por favor, complete todos los campos antes de guardar.",
            icon: "warning"
        });
    }

    return isValid;
};

window.limpiar = limpiar;
window.verificar = verificar;