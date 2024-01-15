import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase-config'; // Asegúrate de que la ruta sea correcta

const obtenerUrlDescarga = async (path) => {
    try {
        const fileRef = ref(storage, path);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        console.error("Error al obtener URL de Firebase Storage:", error);
        throw error;
    }
};

export default obtenerUrlDescarga

