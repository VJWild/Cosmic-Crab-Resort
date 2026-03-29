// src/scripts/gallery3d.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DE PESTAÑAS (TABS) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const containers = document.querySelectorAll('.gallery-3d-container');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar estilos de botones
            tabBtns.forEach(b => {
                b.classList.remove('text-coral');
                b.classList.add('text-bone-white/50');
                b.querySelector('span').classList.replace('w-full', 'w-0');
                b.querySelector('span').classList.replace('bg-coral', 'bg-bone-white');
            });

            btn.classList.remove('text-bone-white/50');
            btn.classList.add('text-coral');
            btn.querySelector('span').classList.replace('w-0', 'w-full');
            btn.querySelector('span').classList.replace('bg-bone-white', 'bg-coral');

            // Mostrar contenedor correspondiente
            const target = btn.getAttribute('data-target');
            containers.forEach(container => {
                if (container.id === `gallery-${target}`) {
                    container.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
                    container.classList.add('opacity-100', 'z-10');
                } else {
                    container.classList.add('opacity-0', 'pointer-events-none', 'z-0');
                    container.classList.remove('opacity-100', 'z-10');
                }
            });
        });
    });

    // --- 2. LÓGICA DE ROTACIÓN 3D ---
    containers.forEach(container => {
        const slides = container.querySelectorAll('.slide-3d');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const dots = container.querySelectorAll('.pagination-dot');
        let currentIndex = Math.floor(slides.length / 2); // Empezar por el medio

        const update3D = () => {
            const isMobile = window.innerWidth < 768;

            slides.forEach((slide, index) => {
                const offset = index - currentIndex;
                const absOffset = Math.abs(offset);

                // --- CÁLCULOS MATEMÁTICOS CINEMATOGRÁFICOS ---
                // Separación lateral optimizada
                const translateX = offset * (isMobile ? 55 : 65);
                // Empuje profundo hacia atrás
                const translateZ = absOffset * (isMobile ? -200 : -350);
                // Ángulo de perspectiva pronunciado
                const rotateY = offset === 0 ? 0 : (offset > 0 ? -45 : 45);
                // Efecto de escala
                const scale = offset === 0 ? 1 : 1 - (absOffset * 0.1);

                // Aplicar Transformaciones fluidas
                slide.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), z-index 0s';
                slide.style.transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
                slide.style.zIndex = 10 - absOffset;

                // Elementos internos
                const trigger = slide.querySelector('.gallery-img-trigger');
                const blocker = slide.querySelector('.click-blocker');
                const zoomIndicator = slide.querySelector('.zoom-indicator');
                const img = slide.querySelector('.slide-img');

                if (offset === 0) {
                    // IMAGEN CENTRAL (Enfocada, iluminada y con borde de cristal)
                    blocker.style.display = 'none'; // Permite clic al lightbox
                    zoomIndicator.classList.remove('hidden');

                    // Efectos de Lujo: Filtro limpio, Sombra profunda con Glow Coral y Borde blanco sutil
                    img.style.filter = 'blur(0px) brightness(100%) grayscale(0%)';
                    trigger.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 40px rgba(239, 64, 60, 0.25)';
                    trigger.style.borderColor = 'rgba(255,255,255,0.4)';
                    trigger.style.opacity = '1';
                    slide.style.pointerEvents = 'auto';

                } else {
                    // IMÁGENES LATERALES (Desenfoque de campo, oscurecidas)
                    blocker.style.display = 'block'; // Bloquea clic al lightbox
                    zoomIndicator.classList.add('hidden');

                    // Blur progresivo según la distancia, oscurecimiento y sin Glow
                    img.style.filter = `blur(${absOffset * 3}px) brightness(${100 - (absOffset * 30)}%) grayscale(30%)`;
                    trigger.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                    trigger.style.borderColor = 'rgba(255,255,255,0.05)';

                    // Ocultar si está muy lejos en el carrusel
                    if (absOffset > 2) {
                        trigger.style.opacity = '0';
                        slide.style.pointerEvents = 'none';
                    } else {
                        trigger.style.opacity = '1';
                        slide.style.pointerEvents = 'auto';
                    }
                }
            });

            // Actualizar Paginación
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.remove('bg-bone-white/30', 'w-2');
                    dot.classList.add('bg-coral', 'w-8');
                } else {
                    dot.classList.add('bg-bone-white/30', 'w-2');
                    dot.classList.remove('bg-coral', 'w-8');
                }
            });
        };

        // Eventos de botones con BUCLE (Loop)
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1;
            }
            update3D();
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            update3D();
        });

        // Hacer clic en las imágenes de atrás para traerlas al frente
        slides.forEach((slide, index) => {
            slide.addEventListener('click', (e) => {
                if (index !== currentIndex) {
                    e.preventDefault();
                    currentIndex = index;
                    update3D();
                }
            });
        });

        // Soporte para gestos táctiles (Swipe en móviles)
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextBtn.click();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                prevBtn.click();
            }
        }

        // Inicializar la vista
        update3D();
        window.addEventListener('resize', update3D); // Re-calcular en caso de girar la pantalla
    });
});