document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('split-container');
    const leftPanel = document.getElementById('left-panel');
    const rightPanel = document.getElementById('right-panel');
    const divider = document.getElementById('slider-divider');

    // Textos
    const leftTitle = document.getElementById('left-title');
    const rightTitle = document.getElementById('right-title');
    const leftDetails = document.getElementById('left-details');
    const rightDetails = document.getElementById('right-details');

    let isDragging = false;

    // Función central que recalcula anchos
    const updateSlider = (clientX) => {
        const rect = container.getBoundingClientRect();
        let positionPercentage = ((clientX - rect.left) / rect.width) * 100;

        // Restringimos para que ninguna pantalla desaparezca por completo
        positionPercentage = Math.max(15, Math.min(positionPercentage, 85));

        // Aplicar anchos a los paneles y posición a la barra divisoria
        leftPanel.style.width = `${positionPercentage}%`;
        rightPanel.style.width = `${100 - positionPercentage}%`;
        divider.style.left = `${positionPercentage}%`;

        // --- Lógica de Opacidad (Fade In / Fade Out) ---

        // Si arrastramos a la derecha (> 70%), se expande la IZQUIERDA (Atlantis)
        if (positionPercentage > 70) {
            leftDetails.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
            leftTitle.classList.add('opacity-0', '-translate-y-8');

            rightTitle.classList.add('opacity-0'); // Ocultar el título apretado
        }
        // Si arrastramos a la izquierda (< 30%), se expande la DERECHA (Cafe)
        else if (positionPercentage < 30) {
            rightDetails.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
            rightTitle.classList.add('opacity-0', '-translate-y-8');

            leftTitle.classList.add('opacity-0'); // Ocultar el título apretado
        }
        // Si está en el medio (30% - 70%), se muestran los títulos principales
        else {
            leftDetails.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
            rightDetails.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');

            leftTitle.classList.remove('opacity-0', '-translate-y-8');
            rightTitle.classList.remove('opacity-0', '-translate-y-8');
        }
    };

    // Eventos para Mouse (PC)
    divider.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Prevenir selección de texto accidental al arrastrar
        e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
        if(isDragging) isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });

    // Eventos para Touch (Móviles / Tablets)
    divider.addEventListener('touchstart', (e) => {
        isDragging = true;
    });

    window.addEventListener('touchend', () => {
        if(isDragging) isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // Prevenir scroll de la pantalla hacia abajo mientras se arrastra horizontalmente
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
    }, { passive: false }); // Passive false es necesario para usar preventDefault en touchmove
});