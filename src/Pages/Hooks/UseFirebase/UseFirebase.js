import initializeAuthentication from "../../firebase/firebase.Init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import { useEffect, useState } from "react";

initializeAuthentication();
const useFirbase = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  const registerUser = (email, password, displayName, location, history) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        //Update user profile
        //update user name..
        const newUser = { email, displayName };
        setUser(newUser);
        saveUserInfo(email, displayName, "POST");

        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {})
          .catch((error) => {});
        const destination = location?.state?.from || "/";
        history(destination);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password, location, history) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        history(destination);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  ///Google signin
  const googleLogin = (location, history) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setError("");
        saveUserInfo(user?.email, user?.displayName, "PUT");
        const destination = location?.state?.from || "/";
        history(destination);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  //logOut any  user
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {})
      .finally(() => setLoading(false));
  };
  //Add register information to database..
  const saveUserInfo = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  ////make admin
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data?.admin));
  }, [user?.email]);
  //Observe user state change..
  //change real time ..
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) =>
          localStorage.setItem("idToken", idToken)
        );
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  return {
    error,
    user,
    setUser,
    registerUser,
    logOut,
    loginUser,
    loading,
    googleLogin,
    admin,
  };
};
export default useFirbase;
