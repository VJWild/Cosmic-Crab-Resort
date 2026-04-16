export function initSliderLogic() {
    const mainContainer = document.getElementById('slider-main');
    const wrapper = document.getElementById('slider-wrapper');
    const sections = document.querySelectorAll('.slider-section');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!wrapper || !mainContainer) return;

    let currentIndex = 0;
    const totalSections = sections.length;
    let isAnimating = false;

    const goToSection = (index) => {
        if (index < 0 || index >= totalSections || isAnimating) return;
        
        isAnimating = true;
        currentIndex = index;

        wrapper.style.transform = `translateY(-${currentIndex * 100}vh)`;
        updateControls();

        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    };

    const updateControls = () => {
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalSections - 1;

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('bg-bone-white', 'scale-150');
                dot.classList.remove('bg-bone-white/20');
            } else {
                dot.classList.remove('bg-bone-white', 'scale-150');
                dot.classList.add('bg-bone-white/20');
            }
        });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goToSection(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSection(currentIndex + 1));

    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.getAttribute('data-index'));
            goToSection(targetIndex);
        });
    });

    // Control de scroll inteligente
    window.addEventListener('wheel', (e) => {
        // Obtenemos la posición exacta del contenedor principal en la pantalla
        const rect = mainContainer.getBoundingClientRect();
        
        // Verificamos si el slider está fijado en la parte superior de la pantalla
        // (Usamos Math.abs < 5 para tener un margen de error con decimales de píxeles)
        const isAtTop = Math.abs(rect.top) < 5;

        // Si el usuario ya bajó por la página y el slider no está en la cima visual, dejamos que haga scroll normal
        if (!isAtTop) return;

        // Si el slider está animándose, bloqueamos el scroll para evitar saltos locos
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        if (isScrollingDown) {
            // Bajando: Si NO estamos en la última sección, bloqueamos scroll nativo y pasamos de slide
            if (currentIndex < totalSections - 1) {
                e.preventDefault(); 
                goToSection(currentIndex + 1);
            }
            // Si es el último, no bloqueamos y la página bajará naturalmente
        } else if (isScrollingUp) {
            // Subiendo: Si NO estamos en la primera sección, bloqueamos scroll nativo y subimos de slide
            if (currentIndex > 0) {
                e.preventDefault();
                goToSection(currentIndex - 1);
            }
        }
    }, { passive: false }); 

    updateControls();
}