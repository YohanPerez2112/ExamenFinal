document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    alert("¡Gracias por tu mensaje, " + name + "! Te responderemos pronto.");
    e.target.reset();
  });