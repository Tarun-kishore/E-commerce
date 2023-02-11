import { useEffect } from "react";
import firebase from "../../firebaseConfig/firebase.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// This component is used to render FirebaseUI's sign-in page
export default function Auth() {
  // The useEffect hook is used to run the code inside the callback function only once
  // when the component is mounted.
  useEffect(() => {
    // Check if FirebaseUI instance exists, if not create one
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    // Configuration for FirebaseUI sign-in flow
    const uiConfig = {
      // Specify the sign-in flow to be a popup
      signInFlow: "popup",
      // URL to redirect to after successful sign-in
      signInSuccessUrl: "/",
      // List of sign-in providers to offer to the user
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: "/tos",
      // Privacy policy url/callback.
      privacyPolicyUrl: "/policy",
    };

    // Start FirebaseUI sign-in flow
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  // Return a div with the id "firebaseui-auth-container" where FirebaseUI
  // will render the sign-in page.
  return <div id="firebaseui-auth-container"></div>;
}
