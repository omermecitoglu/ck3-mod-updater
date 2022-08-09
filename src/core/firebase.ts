import { initializeApp } from "firebase/app";
import { DocumentData, collection, getDocs, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBemWQF5kQZFCf2O_UwfNs3LxAVbHNe4Ag",
  authDomain: "ck3-mod-updater.firebaseapp.com",
  projectId: "ck3-mod-updater",
  storageBucket: "ck3-mod-updater.appspot.com",
  messagingSenderId: "798027806539",
  appId: "1:798027806539:web:679abf54cb16b6ae565ace",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getCollection(name: string): Promise<DocumentData[]> {
  const col = collection(db, name);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return list;
}
