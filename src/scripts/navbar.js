document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');
    const content = document.getElementById('mobile-menu-content');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    let isMenuOpen = false;

    // 1. Lógica del Scroll
    const handleScroll = () => {
        if (isMenuOpen || !navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('bg-navy', 'py-4', 'shadow-2xl');
        } else {
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('bg-navy', 'py-4', 'shadow-2xl');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al cargar por si el usuario recarga a mitad de página

    // 2. Lógica del Menú Móvil
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // ABRIR MENÚ
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            content.classList.remove('translate-y-8');
            content.classList.add('translate-y-0');

            // Transición de Icono Hamburguesa a "X"
            iconMenu.classList.replace('block', 'hidden');
            iconClose.classList.replace('hidden', 'block');
            setTimeout(() => iconClose.classList.remove('rotate-90'), 50); // Giro suave

            // Bloquear Scroll del sitio web
            document.body.style.overflow = 'hidden';

            // Forzar Navbar a transparente para que se fusione con el overlay azul
            navbar.classList.remove('bg-navy', 'shadow-2xl');
            navbar.classList.add('bg-transparent');

        } else {
            // CERRAR MENÚ
            overlay.classList.add('opacity-0', 'pointer-events-none');
            content.classList.remove('translate-y-0');
            content.classList.add('translate-y-8');

            // Transición de Icono "X" a Hamburguesa
            iconClose.classList.add('rotate-90');
            setTimeout(() => {
                iconClose.classList.replace('block', 'hidden');
                iconMenu.classList.replace('hidden', 'block');
            }, 300);

            // Desbloquear Scroll del sitio web
            document.body.style.overflow = 'auto';


            handleScroll();
        }
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Si el usuario hace clic en un enlace del menú móvil, lo cerramos automáticamente
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});