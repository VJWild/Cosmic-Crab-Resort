// src/data/galleryData.js

// Importación de todas las imágenes de tu galería local optimizadas
import atlantis1 from '../assets/images/atlantis1.jpg';
import atlantis2 from '../assets/images/atlantis2.jpg';
import atlantis3 from '../assets/images/atlantis3.jpg';
import atlantis4 from '../assets/images/atlantis4.jpg';
import excursions1 from '../assets/images/excursions1.jpg';
import excursions2 from '../assets/images/excursions2.jpg';
import excursions3 from '../assets/images/excursions3.jpg';
import excursions4 from '../assets/images/excursions4.jpg';
import excursions5 from '../assets/images/excursions5.jpg';
import excursions6 from '../assets/images/excursions6.jpg';
import pool1 from '../assets/images/pool1.jpg';
import pool2 from '../assets/images/pool2.jpg';
import pool3 from '../assets/images/pool3.jpg';
import resort1 from '../assets/images/resort1.jpg';
import restaurant1 from '../assets/images/restaurant1.jpg';
import restaurant2 from '../assets/images/restaurant2.jpg';
import restaurant3 from '../assets/images/restaurant3.jpg';
import restaurant4 from '../assets/images/restaurant4.jpg';
import restaurant5 from '../assets/images/restaurant5.jpg';

// rutas de la carpeta CC Fotos
const ccFotosBatch = Array.from({ length: 93 }, (_, i) => `/images/CC Fotos/CC${i + 1}.jpg`);
const extraFotos = ['/images/CC Fotos/SwansCay4.jpg', '/images/CC Fotos/SwansCay11.jpg'];
const directorioNuevasFotos = [...ccFotosBatch, ...extraFotos];

export const galleryData = {
    resort: [
        "/images/photo-1-home.jpg",
        "/images/photo-5-home.jpg",
        resort1.src,
        "/images/CC Fotos/CC15.jpg",
        "/images/CC Fotos/CC20.jpg",
        "/images/CC Fotos/CC31.jpg",
        "/images/CC Fotos/CC32.jpg",
        "/images/CC Fotos/CC34.jpg",
        "/images/CC Fotos/CC35.jpg",
        "/images/CC Fotos/CC36.jpg"
    ],
    restaurant: [
        "/images/restaurant-home.jpg",
        restaurant1.src,
        restaurant2.src,
        restaurant3.src,
        restaurant4.src,
        restaurant5.src,
        "/images/CC Fotos/CC17.jpg",
        "/images/CC Fotos/CC18.jpg",
        "/images/CC Fotos/CC41.jpg",
        "/images/CC Fotos/CC38.jpg",
        "/images/CC Fotos/CC47.jpg",
        "/images/CC Fotos/CC49.jpg",
        "/images/CC Fotos/CC24.jpg"
    ],
    atlantis: [
        atlantis1.src,
        atlantis2.src,
        atlantis3.src,
        atlantis4.src,
        pool1.src,
        pool2.src,
        pool3.src,
        "/images/CC Fotos/CC30.jpg",
        "/images/CC Fotos/CC37.jpg"
    ],
    excursions: [
        "/images/excursiones/zapatilla.jpg",
        "/images/excursiones/colon.png",
        "/images/excursiones/redfrog.png",
        "/images/excursiones/bat-cave.png",
        "/images/excursiones/beach-combo.jpeg",
        excursions1.src,
        excursions2.src,
        excursions3.src,
        excursions4.src,
        excursions5.src,
        excursions6.src
    ],

    // ==========================================
    // CAJÓN TEMPORAL: Nuevas Fotos de la sesión
    // ==========================================
    nuevas_fotos: directorioNuevasFotos
};