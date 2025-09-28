import { doc, updateDoc, setDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

//creation d'un nouveau document dans une la collection
export const CreateDocument = async (collectionName: string, documentID: string, data: any) => {
    try {
        const documentRref = doc(db, collectionName, documentID);

        await setDoc(documentRref, data)
        return { data: true }

    } catch(error) {
        const firebaseError = error as FirebaseError
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message
            }
        }
    }
}
 
//mise a  jour d'un document dans une collection
export const UpdateDocument = async (collectionName: string, documentID: string, data: any) => {
    try {
        const documentRref = doc(db, collectionName, documentID);

        await updateDoc(documentRref, data)
        return { data: true }

    } catch(error) {
        const firebaseError = error as FirebaseError
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message
            }
        }
    }
}