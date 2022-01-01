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
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

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

  //   Sign up

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
        sendData(temporaryUser, userData, "POST");
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

  // sign in
  const signIn = (email, password, location, history, userData) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setError("");
        Swal.fire("Good job!", "Sign up Successful", "success");
        const redirect_uri = location.state?.from || "/profile";
        history.push(redirect_uri);
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

  // send the user information to the database

  const sendData = (user, userData, type) => {
    const mainData = {
      ...user,
      ...userData,
    };
    if (type === "POST") {
      fetch("https://afternoon-coast-04252.herokuapp.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mainData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  // check if user is admin user
  useEffect(() => {
    setIsAdminLoading(true);
    fetch(`https://afternoon-coast-04252.herokuapp.com/isadmin/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdmin(data);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  }, [user.email]);

  return {
    user,
    setUser,
    loading,
    error,
    admin,
    isAdminLoading,
    setError,
    googleSignIn,
    signUp,
    signIn,
    logout,
  };
};

export default useFirebase;
