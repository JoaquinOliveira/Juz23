// Importa solo las funciones que necesitas de Firebase, en lugar de todo el módulo.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCDdkL-BcAtNRWUuEn8_zR3oZ1wpEuqJwU",
    authDomain: "juzgado23-1e936.firebaseapp.com",
    projectId: "juzgado23-1e936",
    storageBucket: "juzgado23-1e936.appspot.com",
    messagingSenderId: "293242426596",
    appId: "1:293242426596:web:ccef83e628253513f108f1"
};
    

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene las instancias de Firestore, Storage y Auth
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

