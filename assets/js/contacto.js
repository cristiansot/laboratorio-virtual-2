const userNameInput = document.getElementById('userName');
const emailInput = document.getElementById('email');
const asuntoInput = document.getElementById('asunto');
const mensajeInput = document.getElementById('mensaje');
const submitBtn = document.getElementById('submitBtn');
const emailValidation = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

userNameInput.addEventListener('click', () => {
  const userName = prompt('Ingresa tu nombre:');
  userNameInput.value = userName;
  console.log(userName);
});

emailInput.addEventListener('click', () => {
  const email = prompt('Ingresa tu correo electrónico');
  emailInput.value = email;
  console.log(email);
});

asuntoInput.addEventListener('click', () => {
  const asunto = prompt('Ingrese el asunto');
  asuntoInput.value = asunto;
  console.log(asunto);
});

mensajeInput.addEventListener('click', () => {
  const mensaje = prompt('Ingrese el mensaje');
  mensajeInput.value = mensaje;
  console.log(mensaje);
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const userName = userNameInput.value.trim();
  const email = emailInput.value.trim();
  const asunto = asuntoInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  const mensajeFinal = `Hola ${userName}, gracias por contactarte con nosotros. Nos pondremos en contacto contigo prontamente.`;

  try {
    if (!userName || !email || !asunto || !mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    else if (!isNaN(userName)) {
      alert('El nombre no es válido');
      return;
    }
    else if (!emailValidation.test(email)) {
      alert('El E-mail no es válido');
      return;
    }
    else alert(mensajeFinal);
    console.log(mensajeFinal);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
