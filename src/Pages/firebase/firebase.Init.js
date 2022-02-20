import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const firebaseInitialize = () =>{
  initializeApp(firebaseConfig);
}

export default firebaseInitialize;