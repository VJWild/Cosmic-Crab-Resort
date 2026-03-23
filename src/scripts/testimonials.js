document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('testimonial-modal');
    const content = document.getElementById('testimonial-content');
    const closeBtn = document.getElementById('close-testimonial');
    const triggers = document.querySelectorAll('.testimonial-trigger');

    const photoEl = document.getElementById('modal-user-photo');
    const textEl = document.getElementById('modal-testimonial-text');
    const nameEl = document.getElementById('modal-user-name');
    const locEl = document.getElementById('modal-user-location');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Extraer los datos guardados en los data-attributes de cada tarjeta
            photoEl.src = trigger.dataset.photo;
            textEl.textContent = `"${trigger.dataset.text}"`;
            nameEl.textContent = trigger.dataset.name;
            locEl.textContent = trigger.dataset.location;


            modal.classList.replace('hidden', 'flex');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        if(!modal) return;
        modal.classList.add('opacity-0');
        if(content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.classList.replace('flex', 'hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
    });
});