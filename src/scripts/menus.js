document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.getElementById('lightbox-container');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const zoomHint = document.getElementById('zoom-hint');
    let isZoomed = false;

    // Validación de seguridad para evitar errores en otras páginas
    if (!lightbox || !lightboxContainer || !lightboxImg) return;

    // Rutas de las imágenes del menú
    const menuImages = [
        '/images/atlantis-menu/1-1.png',
        '/images/atlantis-menu/2.png',
        '/images/atlantis-menu/3.png'
    ];

    // Abrir Lightbox (Exponemos la función a Window para que onclick en el HTML la encuentre)
    window.openMenu = function(index) {
        lightboxImg.src = menuImages[index];
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');

        // Resetear Zoom y mostrar pista
        isZoomed = false;
        lightboxImg.style.transform = 'scale(0.95)';
        lightboxImg.classList.remove('cursor-zoom-out');
        lightboxImg.classList.add('cursor-zoom-in');
        zoomHint.classList.remove('opacity-0');

        // Retardo para la transición CSS
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightboxImg.style.transform = 'scale(1)';
        }, 10);

        document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
    };

    // Cerrar Lightbox
    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightboxImg.style.transform = 'scale(0.95)';

        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            lightboxImg.src = '';
            isZoomed = false;
            lightboxImg.style.transformOrigin = 'center center';
            document.body.style.overflow = 'auto'; // Desbloquear scroll
        }, 300);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
    lightboxContainer.addEventListener('click', (e) => {
        if (e.target === lightboxContainer || e.target === zoomHint) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    // Lógica de ZOOM (Click para hacer zoom en la imagen)
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita que el click se propague al contenedor y cierre el lightbox

        if (!isZoomed) {
            isZoomed = true;
            this.classList.remove('cursor-zoom-in');
            this.classList.add('cursor-zoom-out');
            zoomHint.classList.add('opacity-0'); // Ocultar pista al hacer zoom

            // Calcular el punto donde se hizo clic para hacer el zoom hacia esa zona exacta
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            this.style.transformOrigin = `${x}% ${y}%`;
            this.style.transform = 'scale(2.5)'; // Nivel de aumento (x2.5)
        } else {
            // Alejar Zoom
            isZoomed = false;
            this.classList.remove('cursor-zoom-out');
            this.classList.add('cursor-zoom-in');
            this.style.transform = 'scale(1)';
            zoomHint.classList.remove('opacity-0');

            // Resetear el origen al centro después de terminar la animación
            setTimeout(() => {
                if(!isZoomed) this.style.transformOrigin = 'center center';
            }, 500);
        }
    });

    // Lógica de Paneo (Mover el mouse para navegar por la imagen ampliada)
    lightboxContainer.addEventListener('mousemove', function(e) {
        if (!isZoomed) return;

        // Calculamos la posición del ratón respecto a toda la pantalla
        const rect = lightboxContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Movemos el origen de la imagen ampliada hacia donde apunta el ratón fluidamente
        lightboxImg.style.transformOrigin = `${x}% ${y}%`;
    });
});