document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const galleryTriggers = document.querySelectorAll('.gallery-img-trigger');

    // 1. Abrir Modal y Animar
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const img = trigger.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;


                lightbox.classList.replace('hidden', 'flex');


                setTimeout(() => {
                    lightbox.classList.remove('opacity-0');
                    lightboxImg.classList.remove('scale-95');
                    lightboxImg.classList.add('scale-100');
                }, 10);

                document.body.style.overflow = 'hidden';
            }
        });
    });

    // 2. Función de cierre con animaciones en reversa
    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.add('opacity-0');
        if (lightboxImg) {
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
        }

        // Esperamos que termine la animación (500ms)
        setTimeout(() => {

            lightbox.classList.replace('flex', 'hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    };

    // 3. Listeners para cerrar
    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if(lightbox) lightbox.addEventListener('click', (e) => {
        // Cierra si se hace clic fuera de la foto
        if (e.target === lightbox || e.target.parentElement === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) closeLightbox();
    });
});