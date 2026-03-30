const form = document.getElementById("contact-form");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const message = form.elements['message'].value;
    const phoneNumber = "584128226885"

    const text = 
        `*NUEVO CONTACTO WEB*\n\n` +
        `*Nombre:* ${name}\n` +
        `*Correo:* ${email}\n` +
        `*Mensaje:* ${message}\n\n` +
        `_Enviado desde el sitio oficial de Cosmic Crab Resort._`;

    const finalText = encodeURIComponent(text);

    const urlWhatsApp = `https://wa.me/${phoneNumber}?text=${finalText}`;
    window.open(urlWhatsApp, '_blank');
})