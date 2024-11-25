let equipoData;
let equipoDataNuevo;
let cardsContainer = document.querySelector('.cards__container');
let dropdownItems = document.querySelectorAll('.dropdown-item');
let buscador = document.querySelector('.buscador');
let merge = [];
let btnForm = document.querySelector('.btnForm');

function bubbleSort(merge) {
  for (let i = 0; i < merge.length; i++) {
    if (merge[i] > merge[i + 1]) {
      let j = merge[i + 1];
      merge[i + 1] = merge[i];
      merge[i] = j;
      bubbleSort(merge);
    }
  }
  return merge;
}

function ordenarPorExperiencia(data) {
  const maxExperiencia = Math.max(...data.map(item => item.años_experiencia));
  const count = new Array(maxExperiencia + 1).fill(0);

  data.forEach(item => {
    count[item.años_experiencia]++;
  });
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  const sortedData = new Array(data.length);
  for (let i = data.length - 1; i >= 0; i--) {
    const experiencia = data[i].años_experiencia;
    const index = count[experiencia] - 1;
    sortedData[index] = data[i];
    count[experiencia]--;
  }
  merge = sortedData;
  console.log(merge);
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

  inputName.value = '';
  inputEspecialidad.value = '';
  inputExperiencia.value = '';
  inputResumen.value = '';

  alert('¡Doctor agregado exitosamente!');
  console.log('¡Doctor agregado exitosamente!');
});


function eliminarDoctor(nombreDoctor) {
  const index = merge.findIndex(doctor => doctor.nombre === nombreDoctor);
  if (index !== -1) {
    merge.splice(index, 1);
    mostrarTarjetas('todos');
    console.log('Doctor eliminado:', nombreDoctor);
    console.log('Array actualizado:', merge);
  }
}

function mostrarTarjetasConFiltro(filteredData) {
  cardsContainer.innerHTML = '';
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

Promise.all([
  fetch('./equipo.json')
    .then(function (response) {
      if (response.ok) {
        console.log("Respuesta recibida (equipo.json):", response);
        return response.json();
      } else {
        console.log("No se puede leer el archivo equipo.json", response.status);
        throw new Error("Error al leer equipo.json");
      }
    }),
  fetch('./equipo_nuevo.json')
    .then(function (response) {
      if (response.ok) {
        console.log("Respuesta recibida (equipo_nuevo.json):", response);
        return response.json();
      } else {
        console.log("No se puede leer el archivo equipo_nuevo.json", response.status);
        throw new Error("Error al leer equipo_nuevo.json");
      }
    })
])
  .then(([data, dataNueva]) => {
    equipoData = data;
    equipoDataNuevo = dataNueva;
    merge = [...equipoData, ...equipoDataNuevo];
    console.log('Datos combinados:', merge);

    bubbleSort(merge);
    mostrarTarjetas('todos');

    dropdownItems.forEach(item => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        const especialidadSeleccionada = item.textContent.trim();
        console.log("Especialidad seleccionada:", especialidadSeleccionada);
        mostrarTarjetas(especialidadSeleccionada === "Todas las Especialidades" ? 'todos' : especialidadSeleccionada.toLowerCase());
      });
    });

    buscador.addEventListener('input', function () {
      const inputValue = buscador.value.trim().toLowerCase();
      if (inputValue) {
        const filteredMerge = merge.filter(item => item.nombre.toLowerCase().includes(inputValue));
        console.log('Resultados de la búsqueda en tiempo real:', filteredMerge);
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
        ordenarPorExperiencia(merge);
        mostrarTarjetas('todos');
      }
    });
  })
  .catch(error => console.log("Hubo un problema con la petición Fetch: " + error.message));
