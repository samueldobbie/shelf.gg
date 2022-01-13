import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDo4HDKDpkXlAlQovTYvIPekhizZUn3o8Y",
  authDomain: "shelf-gg.firebaseapp.com",
  projectId: "shelf-gg",
  appId: "1:404360518247:web:fdc51154b5d10ce84892c2",
}

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)

if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080)
}

export { db, firebase }
