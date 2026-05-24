const menus = {
    atlantis: [
        '/images/atlantis-menu/1-1.png',
        '/images/atlantis-menu/2.png',
        '/images/atlantis-menu/3.png'
    ],
    cafe: [
        '/images/cafe-menu/Breakfast-1.jpg',
        '/images/cafe-menu/Breakfast-2.jpg',
        '/images/cafe-menu/Breakfast-3.jpg',
        '/images/cafe-menu/5.jpg',
        '/images/cafe-menu/6.jpg',
        '/images/cafe-menu/7.jpg'
    ]
};

function initSplitScreen() {
    const container = document.getElementById('split-container');
    const leftPanel = document.getElementById('left-panel');
    const rightPanel = document.getElementById('right-panel');
    const divider = document.getElementById('slider-divider');

    const leftTitle = document.getElementById('left-title');
    const rightTitle = document.getElementById('right-title');
    const leftDetails = document.getElementById('left-details');
    const rightDetails = document.getElementById('right-details');

    if (!container || !leftPanel || !rightPanel || !divider || !leftTitle || !rightTitle || !leftDetails || !rightDetails) {
        return;
    }
    if (container.dataset.splitInitialized === 'true') {
        return;
    }
    container.dataset.splitInitialized = 'true';

    let isDragging = false;

    const updateSlider = (clientX) => {
        const rect = container.getBoundingClientRect();
        let positionPercentage = ((clientX - rect.left) / rect.width) * 100;

        positionPercentage = Math.max(15, Math.min(positionPercentage, 85));

        leftPanel.style.width = `${positionPercentage}%`;
        rightPanel.style.width = `${100 - positionPercentage}%`;
        divider.style.left = `${positionPercentage}%`;

        if (positionPercentage > 70) {
            leftDetails.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
            leftTitle.classList.add('opacity-0', '-translate-y-8');
            rightTitle.classList.add('opacity-0');
        } else if (positionPercentage < 30) {
            rightDetails.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');
            rightTitle.classList.add('opacity-0', '-translate-y-8');
            leftTitle.classList.add('opacity-0');
        } else {
            leftDetails.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
            rightDetails.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
            leftTitle.classList.remove('opacity-0', '-translate-y-8');
            rightTitle.classList.remove('opacity-0', '-translate-y-8');
        }
    };

    divider.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });

    divider.addEventListener('touchstart', () => {
        isDragging = true;
    });

    window.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
    }, { passive: false });
}

function initModal() {
    const modal = document.getElementById('menu-modal');
    if (!modal) return;
    if (modal.dataset.initialized === 'true') return;
    modal.dataset.initialized = 'true';

    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const paginationContainer = document.getElementById('modal-pagination');
    const menuBtns = document.querySelectorAll('.menu-btn');

    let currentImages = [];
    let currentIndex = 0;

    function openModal(menuType) {
        if (!menus[menuType]) return;

        currentImages = menus[menuType];
        currentIndex = 0;

        updateImage();
        createPagination();

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (modalImg) {
                modalImg.src = '';
            }
            if (paginationContainer) {
                paginationContainer.innerHTML = '';
            }
        }, 300);
    }

    function updateImage() {
        if (!modalImg) return;

        modalImg.classList.remove('scale-100', 'opacity-100');
        modalImg.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modalImg.src = currentImages[currentIndex];
            modalImg.classList.remove('scale-95', 'opacity-0');
            modalImg.classList.add('scale-100', 'opacity-100');
            updatePagination();
        }, 200);
    }

    function createPagination() {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';
        currentImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = index === currentIndex
                ? 'w-6 h-2 md:w-8 md:h-3 rounded-full transition-all duration-300 bg-coral'
                : 'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 bg-bone-white/50 hover:bg-bone-white';

            dot.addEventListener('click', () => {
                currentIndex = index;
                updateImage();
            });

            paginationContainer.appendChild(dot);
        });
    }

    function updatePagination() {
        if (!paginationContainer) return;

        const dots = Array.from(paginationContainer.children);
        dots.forEach((dot, index) => {
            dot.className = index === currentIndex
                ? 'w-6 h-2 md:w-8 md:h-3 rounded-full transition-all duration-300 bg-coral'
                : 'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 bg-bone-white/50 hover:bg-bone-white';
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateImage();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateImage();
    }

    menuBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const menuType = btn.dataset.menu;
            if (menuType === 'atlantis' || menuType === 'cafe') {
                openModal(menuType);
            }
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    nextBtn?.addEventListener('click', nextImage);
    prevBtn?.addEventListener('click', prevImage);

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('opacity-100')) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowRight') nextImage();
        if (event.key === 'ArrowLeft') prevImage();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function initRestaurantSlider() {
    initSplitScreen();
    initModal();
}

document.addEventListener('DOMContentLoaded', initRestaurantSlider);
document.addEventListener('astro:page-load', initRestaurantSlider);


