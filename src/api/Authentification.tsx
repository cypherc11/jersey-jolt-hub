import { auth } from "@/lib/firebase"
import { error } from "console";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

//creation de compte
export const sigUP = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user
        return { data: user }
    } catch (error) {
        const firebaseError = error as FirebaseError
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message
            }
        }
    }
}

//connexion au compte
export const sigIN = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); // Tentative de connexion
        const user = userCredential.user
        console.log(user)
        return { success: true }; // Succès
    } catch (error) {
        const firebaseError = error as FirebaseError
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message
            }
        }
    }
}

//deconnexion au compte
export const logout = async () => {
    try {
        await signOut(auth)
        return {sucess : true}
    } catch (error) {
        const firebaseError = error as FirebaseError
        return {
            error : {
                code : firebaseError.code,
                message : firebaseError.message
            }
        }
    }
}