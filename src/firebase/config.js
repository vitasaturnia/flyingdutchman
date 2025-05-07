import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5o6yFSYM_jgyGoqRDP7N8pHd-EzoQ_cE",
  authDomain: "fdelectronics-4cbf3.firebaseapp.com",
  projectId: "fdelectronics-4cbf3",
  storageBucket: "fdelectronics-4cbf3.firebasestorage.app",
  messagingSenderId: "704346979221",
  appId: "1:704346979221:web:80b132834247248ecb149c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 