import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import initializeAuth from "./../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

initializeAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  //   google sign in
  const googleSignIn = (location, history) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   Sign in

  const signUp = (email, password, name, img, location, history, userData) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const temporaryUser = {
          displayName: name,
          email: email,
          photoURL: img,
        };
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: img,
        });
        setUser(temporaryUser);
        setError("");
        const redirect_uri = location.state?.from || "/profile";
        history.push(redirect_uri);
        Swal.fire("Good job!", "Sign up Successful", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = (email, password, location, history, userData) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        Swal.fire("Good job!", "Sign up Successful", "success");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorMessage}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   logout

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          console.log(user);
        } else {
          setUser({});
        }
        setLoading(false);
      }),
    [auth]
  );

  return {
    user,
    loading,
    error,
    setError,
    googleSignIn,
    signUp,
    signIn,
    logout,
  };
};

export default useFirebase;
