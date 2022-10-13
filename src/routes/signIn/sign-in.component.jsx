import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

import { 
  auth,
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

  useEffect(() => {
 
    async function _getRedirectResult() {
       const response = await getRedirectResult(auth);
       if (response) {
         const userDocRef = await createUserDocumentFromAuth(response.user);
       }
     }
     _getRedirectResult();
   }, []);

  const logGoogleUser = async  () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

const logGoogleRedirectUser = async () => {
  const {user} = await signInWithGoogleRedirect();
}

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In with Google Popup
      </button>
      <button onClick={logGoogleRedirectUser}>
        Sign In with Google Redirect
      </button>
      
      <SignUpForm />


    </div>
  )
}

export default SignIn;

