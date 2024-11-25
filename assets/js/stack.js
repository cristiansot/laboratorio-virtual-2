let merge = [];

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
    merge = [...data, ...dataNueva];
    console.log('Datos combinados:', merge);

    const selectEspecialista = document.querySelector('.form-select');
    if (selectEspecialista) {
      merge.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.nombre;
        option.textContent = doctor.nombre;
        selectEspecialista.appendChild(option);
      });
    } else {
      console.error('El select de especialistas no se encuentra en el DOM.');
    }
  })
  .catch(error => console.log("Hubo un problema con la petición Fetch: " + error.message));

document.addEventListener('DOMContentLoaded', function () {
  class Stack {
    constructor() {
      this.stack = [];
    }

    push(element) {
      this.stack.push(element);
      return this.stack;
    }

    pop() {
      return this.stack.pop();
    }

    peek() {
      return this.stack[this.stack.length - 1];
    }

    size() {
      return this.stack.length;
    }

    print() {
      console.log(this.stack);
    }
  }

  const stack = new Stack();
  const submitBtn = document.getElementById('submitBtn');
  const citaSection = document.getElementById('citaSection');
  const selectEspecialista = document.querySelector('.form-select');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('email').value.trim();
      const especialista = selectEspecialista ? selectEspecialista.value : ""; 

      if (!name) {
        alert('Por favor, ingresa tu nombre.');
        return;
      }
      if (!email) {
        alert('Por favor, ingresa tu correo.');
        return;
      }
      if (especialista === "Seleccione un especialista") {
        alert('Por favor, selecciona un especialista.');
        return;
      }

      const cita = {
        nombre: name,
        email: email,
        especialista,
      };

      stack.push(cita);

      citaSection.innerHTML = '';
      stack.stack.forEach((cita, index) => {
        citaSection.innerHTML += `
          <div class="card mb-3">
            <div class="card-header">
              <strong>Cita ${index + 1}</strong>
            </div>
            <div class="card-body">
              <p><strong>Nombre:</strong> ${cita.nombre}</p>
              <p><strong>E-mail:</strong> ${cita.email}</p>
              <p><strong>Especialista:</strong> ${cita.especialista}</p>
            </div>
          </div>
        `;
      });

      document.getElementById('userName').value = '';
      document.getElementById('email').value = '';
      if (selectEspecialista) selectEspecialista.value = 'Seleccione un especialista';

      stack.print();
    });
  } else {
    console.error('El botón submitBtn no se encuentra en el DOM.');
  }
});
