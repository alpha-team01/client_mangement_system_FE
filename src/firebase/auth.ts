import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";


interface LoginData {
    email : string;
    password : string;
    remainder : boolean;
}

export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>{
   return  createUserWithEmailAndPassword(auth, email, password); 
}  

export const doSignInWithEmailAndPassword = (values : LoginData) =>{

    const email =  values.email;
    const password = values.password;
    return signInWithEmailAndPassword(auth, email, password);
    
}

export const doSignOut = () =>{
    return auth.signOut();
}