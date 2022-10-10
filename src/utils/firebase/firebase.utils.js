import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAPmTdBt103p2wnOQQ-ZrM7CYgwfoYSrF8",
	authDomain: "crwn-clothing-db-3dfd6.firebaseapp.com",
	projectId: "crwn-clothing-db-3dfd6",
	storageBucket: "crwn-clothing-db-3dfd6.appspot.com",
	messagingSenderId: "1091770408106",
	appId: "1:1091770408106:web:93657b324c42b6b88a04d3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	// if user data does not exist
	//create / set the document with the data from userAuth in my collection

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creatng the user", error.message);
		}
	}

	// if user data exists

	//return something
	return userDocRef;
};
