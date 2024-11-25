document.getElementById("submitBtn").addEventListener("click", function () {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("asunto").value.trim();

  if (name && email && subject) {
    const patient = { name, email, subject };
    queue.enqueue(patient);
    console.log("Paciente añadido:", patient);
    console.log("Cola actual:", queue.print());

    document.getElementById("userName").value = '';
    document.getElementById("email").value = '';
    document.getElementById("asunto").value = '';

    alert(`Paciente ${name} añadido a la lista de espera.`);
    renderQueue();
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    return this.queue;
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  print() {
    return this.queue;
  }
}

const queue = new Queue();

function renderQueue() {
  const queueContainer = document.getElementById("queueContainer");
  queueContainer.innerHTML = ''; 

  queue.print().forEach((patient, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">Paciente ${index + 1}: ${patient.name}</h5>
        <p class="card-text"><strong>Email:</strong> ${patient.email}</p>
        <p class="card-text"><strong>Asunto:</strong> ${patient.subject}</p>
      </div>
    `;
    queueContainer.appendChild(card);
  });
}
