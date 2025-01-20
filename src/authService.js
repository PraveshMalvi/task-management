// src/authService.js
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";


export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-out failed:", error);
    throw error;
  }
};
