import React, { useState, useEffect, createContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import firebase from "./firebaseConfig/firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//importing components
import Auth from "./components/Auth/Auth";
import MyNavbar from "./components/Navbar/Navbar";
import Home from "./components/IndexComponents/Home/Home";
import About from "./components/IndexComponents/About/About";
import ContactUs from "./components/IndexComponents/ContactUs/ContactUs";
import NotFound from "./components/IndexComponents/NotFound/NotFound";

import Profile from "./components/UserComponents/Profile/Profile";
import Settings from "./components/UserComponents/Settings/Settings";
import MyProducts from "./components/UserComponents/myProducts/myProducts";
import Cart from "./components/Cart/Cart.jsx";
import { getCart } from "./utils/cart";

// Create the UserContext for sharing data across components
export const UserContext = createContext(null);
export const axiosContext = createContext(axios.create());
export const cartContext = createContext([]);

// The main component of the app
function App() {
  // The state to store the user data
  const [user, setUser] = useState();
  const [cart, setCart] = useState(getCart());
  //const axiosInstance = axios.create({
  //headers: {
  //"Content-Type": "application/json",
  //},
  //});
  const axiosInstance = useRef(
    axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  // Use effect hook to check if the user is authenticated
  useEffect(() => {
    // Call the onAuthStateChanged function from firebase/auth to check the user's authentication status
    onAuthStateChanged(firebase.auth(), (user) => {
      // If the user is authenticated

      if (user) {
        let idToken;
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then((token) => {
            idToken = token;
          })
          .then(() => {
            axiosInstance.current = axios.create({
              headers: {
                "Content-Type": "application/json",
                AuthToken: idToken,
              },
            });
            setUser({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              idToken,
            });
          });
        // Set the user data in the state
      } else {
        // If the user is not authenticated, set the user state to null
        axiosInstance.current = axios.create({
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser();
      }
    });
  }, []);

  // Return the HTML structure of the app
  return (
    <>
      {/* Provide the user data to other components using the UserContext */}
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <cartContext.Provider value={{ cart, setCart }}>
          <axiosContext.Provider value={axiosInstance.current}>
            {/* Use the React Router for navigation */}
            <Router>
              {/* Include the Navbar component */}
              <MyNavbar />
              {/* Define the routes of the app */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                {/* If the user is authenticated, show the Home page. If not, show the Auth page */}
                <Route path="/signin" element={user ? <Home /> : <Auth />} />
                {/* If the user is authenticated, show the Profile page. If not, show the Auth page */}
                <Route
                  path="/profile"
                  element={user ? <Profile /> : <Auth />}
                />
                {/* If the user is authenticated, show the Settings page. If not, show the Auth page */}
                <Route
                  path="/settings"
                  element={user ? <Settings /> : <Auth />}
                />
                {/* If the user is authenticated, show the my products page. If not, show the Auth page */}
                <Route
                  path="/myProducts"
                  element={user ? <MyProducts /> : <Auth />}
                />
                <Route path="/cart" element={user ? <Cart /> : <Auth />} />
                {/* If no matching route is found, show the 404 page*/}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </axiosContext.Provider>
        </cartContext.Provider>
      </UserContext.Provider>
    </>
  );
}

// Exporting the App component
export default App;
