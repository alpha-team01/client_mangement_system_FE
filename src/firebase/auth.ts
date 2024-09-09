import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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

export const doGoogleSignIn = async () =>{
    // Google Sign In

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
}

export const doSignOut = () =>{
    return auth.signOut();
}
