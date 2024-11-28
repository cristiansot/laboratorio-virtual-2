function simulateNewPatient() {
  const patient = "Juan Perez";

  const event = new CustomEvent("newPatient", { detail: patient });
  document.dispatchEvent(event);
}

document.addEventListener("newPatient", (e) => {
  const patient = e.detail;
  console.log(patient);

  const notificationArea = document.getElementById("notification-area");
  notificationArea.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show mb-0" role="alert">
      <strong>Nuevo paciente recibido:</strong> ${patient}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
});

setTimeout(simulateNewPatient, 2000);
