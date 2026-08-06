export function initSliderLogic() {
  const mainSection = document.getElementById('slider-main');
  const wrapper = document.getElementById('slider-wrapper');
  const dots = document.querySelectorAll('.nav-dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!wrapper || !mainSection) return;

  let currentIndex = 0;
  const totalSlides = dots.length;
  let isAnimating = false;

  const updateSlider = () => {
    // Mantiene tu animación original
    wrapper.style.transform = `translateY(-${currentIndex * 100}vh)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('bg-bone-white', 'scale-150');
        dot.classList.remove('bg-bone-white/20');
      } else {
        dot.classList.remove('bg-bone-white', 'scale-150');
        dot.classList.add('bg-bone-white/20');
      }
    });
  };

  // Eventos de botones
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0 && !isAnimating) { currentIndex--; updateSlider(); }});
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < totalSlides - 1 && !isAnimating) { currentIndex++; updateSlider(); }});

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      if(isAnimating) return;
      currentIndex = parseInt(e.target.getAttribute('data-index'));
      updateSlider();
    });
  });

  // MAGIA PARA PC: Controlar la rueda del ratón
  mainSection.addEventListener('wheel', (e) => {
    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    // Permitir scroll normal solo si estamos en la primera (y subimos) o en la última (y bajamos)
    if (isScrollingDown && currentIndex === totalSlides - 1) return;
    if (isScrollingUp && currentIndex === 0) return;

    // ¡BLOQUEAR EL SCROLL DE LA PÁGINA!
    e.preventDefault();

    if (isAnimating) return;

    // Asegurar que la pantalla esté centrada en el slider
    const rect = mainSection.getBoundingClientRect();
    if (Math.abs(rect.top) > 10) {
        mainSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (isScrollingDown && currentIndex < totalSlides - 1) {
        currentIndex++;
        isAnimating = true;
        updateSlider();
        setTimeout(() => { isAnimating = false; }, 1200); // Coincide con la duración CSS
    } else if (isScrollingUp && currentIndex > 0) {
        currentIndex--;
        isAnimating = true;
        updateSlider();
        setTimeout(() => { isAnimating = false; }, 1200);
    }
  }, { passive: false }); // <-- CRÍTICO PARA PODER BLOQUEAR EL SCROLL

  // MAGIA PARA MÓVILES: Controlar el deslizamiento táctil
  let touchStartY = 0;
  mainSection.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
  }, { passive: true });

  mainSection.addEventListener('touchmove', (e) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;

      if (isScrollingDown && currentIndex === totalSlides - 1) return;
      if (isScrollingUp && currentIndex === 0) return;

      if(Math.abs(deltaY) > 20) e.preventDefault(); // Bloquear scroll en móvil
  }, { passive: false });

  mainSection.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (isAnimating || Math.abs(deltaY) < 50) return;

      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;

      if (isScrollingDown && currentIndex === totalSlides - 1) return;
      if (isScrollingUp && currentIndex === 0) return;

      if (isScrollingDown && currentIndex < totalSlides - 1) {
          currentIndex++;
          isAnimating = true;
          updateSlider();
          setTimeout(() => { isAnimating = false; }, 1200);
      } else if (isScrollingUp && currentIndex > 0) {
          currentIndex--;
          isAnimating = true;
          updateSlider();
          setTimeout(() => { isAnimating = false; }, 1200);
      }
  });

  updateSlider();
}