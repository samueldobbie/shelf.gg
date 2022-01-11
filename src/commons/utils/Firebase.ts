import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}
  
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)

if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080)
}

export { db, firebase }
