document.addEventListener('DOMContentLoaded', async () => {
  let equipoData = [];
  let equipoDataNuevo = [];
  let merge = [];

  const cardsContainer = document.querySelector('.cards__container');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const buscador = document.querySelector('.buscador');
  const btnForm = document.querySelector('.btnForm');

  function bubbleSort(array) {
    let len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j].años_experiencia > array[j + 1].años_experiencia) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return array;
  }

  function mostrarTarjetas(filtro) {
    cardsContainer.innerHTML = '';
    let filteredData;
    if (filtro === 'todos') {
      filteredData = merge;
    } else {
      filteredData = merge.filter(item => item.especialidad.toLowerCase() === filtro.toLowerCase());
    }

    filteredData.forEach(({ nombre, imagen, especialidad, resumen, años_experiencia }) => {
      cardsContainer.innerHTML += `
        <div class="col-12"> 
          <div class="card m-1"> 
            <img class="card-img-top" src="${imagen}" alt="${nombre}">
            <div class="card-body">
              <h4 class="card-title mt-1">${nombre}</h4>
              <h5 class="card-title">${especialidad}</h5>
              <h6>${años_experiencia} años de experiencia</h6>
              <p class="card-text">${resumen}</p>
              <button type="button" class="btn" style="background-color: #ff2a6b; color: #FFF; border-radius: 20px;">
                Eliminar Doctor
              </button>
            </div>
          </div>
        </div>`;
    });
  }

  function eliminarDoctor(nombreDoctor) {
    const index = merge.findIndex(doctor => doctor.nombre === nombreDoctor);
    if (index !== -1) {
      merge.splice(index, 1);
      mostrarTarjetas('todos');
      console.log('Doctor eliminado:', nombreDoctor);
    }
  }

  async function cargarDatos() {
    try {
      const [responseEquipo, responseEquipoNuevo] = await Promise.all([
        fetch('./equipo.json'),
        fetch('./equipo_nuevo.json')
      ]);

      if (!responseEquipo.ok) throw new Error('Error al leer equipo.json');
      if (!responseEquipoNuevo.ok) throw new Error('Error al leer equipo_nuevo.json');

      equipoData = await responseEquipo.json();
      equipoDataNuevo = await responseEquipoNuevo.json();
      merge = [...equipoData, ...equipoDataNuevo];

      console.log('Datos combinados:', merge);
      bubbleSort(merge);
      mostrarTarjetas('todos');
    } catch (error) {
      console.error('Hubo un problema con la petición Fetch:', error.message);
    }
  }

  await cargarDatos();

  dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      const especialidadSeleccionada = item.textContent.trim();
      mostrarTarjetas(especialidadSeleccionada === 'Todas las Especialidades' ? 'todos' : especialidadSeleccionada.toLowerCase());
    });
  });

  buscador.addEventListener('input', function () {
    const inputValue = buscador.value.trim().toLowerCase();
    if (inputValue) {
      const filteredMerge = merge.filter(item => item.nombre.toLowerCase().includes(inputValue));
      mostrarTarjetasConFiltro(filteredMerge);
    } else {
      mostrarTarjetas('todos');
    }
  });

  cardsContainer.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('btn')) {
      const card = event.target.closest('.card');
      const doctorName = card.querySelector('.card-title').textContent;
      eliminarDoctor(doctorName);
    }
  });

  document.querySelector('#inputGroupSelect01').addEventListener('change', function () {
    if (this.value === '1') {
      merge.sort((a, b) => b.años_experiencia - a.años_experiencia);
      mostrarTarjetas('todos');
    }
  });

  btnForm.addEventListener('click', function (event) {
    event.preventDefault();
    const nombre = inputName.value.trim();
    const especialidad = inputEspecialidad.value.trim();
    const años_experiencia = parseInt(inputExperiencia.value.trim());
    const resumen = inputResumen.value.trim();

    if (!nombre || !especialidad || !resumen || isNaN(años_experiencia) || años_experiencia <= 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const nuevoDoctor = {
      nombre,
      especialidad,
      años_experiencia,
      resumen,
      imagen: './assets/img/doc_default.jpg',
    };

    merge.push(nuevoDoctor);
    mostrarTarjetas('todos');
    alert('¡Doctor agregado exitosamente!');
  });
});
