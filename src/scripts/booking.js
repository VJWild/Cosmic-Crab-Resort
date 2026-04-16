document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hero-booking-form');
    const checkInInput = document.getElementById('hero-checkIn');
    const checkOutInput = document.getElementById('hero-checkOut');
    const stayLengthInput = document.getElementById('hero-stayLength');

    if (!form) return;

    // 1. Fechas iniciales
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    checkInInput.value = today;
    checkInInput.min = today;
    checkOutInput.value = tomorrow.toISOString().split('T')[0];
    checkOutInput.min = tomorrow.toISOString().split('T')[0];

    // 2. Bloqueo de fechas anteriores
    checkInInput.addEventListener('change', () => {
        const selectedInDate = new Date(checkInInput.value);
        const minOutDate = new Date(selectedInDate);
        minOutDate.setDate(selectedInDate.getDate() + 1);
        
        const minOutStr = minOutDate.toISOString().split('T')[0];
        checkOutInput.min = minOutStr;

        if (checkOutInput.value < minOutStr) {
            checkOutInput.value = minOutStr;
        }
    });

    // 3. Cálculo de noches para Freetobook
    form.addEventListener('submit', (e) => {
        const dateIn = new Date(checkInInput.value);
        const dateOut = new Date(checkOutInput.value);
        const diff = dateOut.getTime() - dateIn.getTime();
        const nights = Math.ceil(diff / (1000 * 3600 * 24));

        if (nights <= 0) {
            e.preventDefault();
            alert("La fecha de salida debe ser posterior a la de entrada.");
            return;
        }
        stayLengthInput.value = nights;
    });
});