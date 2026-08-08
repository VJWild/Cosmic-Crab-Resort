// src/data/galleryData.js

// Importación de todas las imágenes de tu galería local optimizadas
import photo1 from "../assets/images/photo-1-home.jpg"
import photo5 from "../assets/images/photo-5-home.jpg"
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
import zapatilla from '../assets/images/excursiones/zapatilla.jpg';
import colon from '../assets/images/excursiones/colon.png';
import redfrog from '../assets/images/excursiones/redfrog.png';
import batCave from '../assets/images/excursiones/bat-cave.png';
import beachCombo from '../assets/images/excursiones/beach-combo.jpeg';
import pool1 from '../assets/images/pool1.jpg';
import pool2 from '../assets/images/pool2.jpg';
import pool3 from '../assets/images/pool3.jpg';
import resort1 from '../assets/images/resort1.jpg';
import restaurantHome from "../assets/images/restaurant-home.jpg"
import restaurant1 from '../assets/images/restaurant1.jpg';
import restaurant2 from '../assets/images/restaurant2.jpg';
import restaurant3 from '../assets/images/restaurant3.jpg';
import restaurant4 from '../assets/images/restaurant4.jpg';
import restaurant5 from '../assets/images/restaurant5.jpg';

const ccFotosImport = import.meta.glob('../assets/images/CC Fotos/CC*.jpg', { eager: true})
const ccFotos = Object.values(ccFotosImport).map(modulo => modulo.default);

// rutas de la carpeta CC Fotos
const ccFotosBatch = Array.from({ length: 93 }, (_, i) => `/images/CC Fotos/CC${i + 1}.jpg`);
const extraFotos = ['/images/CC Fotos/SwansCay4.jpg', '/images/CC Fotos/SwansCay11.jpg'];
const directorioNuevasFotos = [...ccFotosBatch, ...extraFotos];


export const galleryData = {
    resort: [
        photo1,
        photo5,
        resort1,
        ccFotos[13],
        ccFotos[19],
        ccFotos[30],
        ccFotos[31],
        ccFotos[33],
        ccFotos[34],
        ccFotos[35]
    ],
    restaurant: [
        restaurantHome,
        restaurant1,
        restaurant2,
        restaurant3,
        restaurant4,
        restaurant5,
        ccFotos[15],
        ccFotos[17],
        ccFotos[40],
        ccFotos[37],
        ccFotos[46],
        ccFotos[48],
        ccFotos[23]
    ],
    atlantis: [
        atlantis1,
        atlantis2,
        atlantis3,
        atlantis4,
        pool1,
        pool2,
        pool3,
        ccFotos[29],
        ccFotos[36]
    ],
    excursions: [
        zapatilla,
        colon,
        redfrog,
        batCave,
        beachCombo,
        excursions1,
        excursions2,
        excursions3,
        excursions4,
        excursions5,
        excursions6
    ],

    // ==========================================
    // CAJÓN TEMPORAL: Nuevas Fotos de la sesión
    // ==========================================
    nuevas_fotos: ccFotos
};