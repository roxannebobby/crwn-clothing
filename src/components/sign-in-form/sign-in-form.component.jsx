import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async  () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        resetFormFields();
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })

  };


  
  return (

    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit = {handleSubmit}>
      
        <FormInput 
          label='Email'
          inputOptions = {{
            type: 'email',
            required: true, 
            onChange: handleChange, 
            name: 'displayName',
            value: displayName, 
            }}
        />

        <FormInput 
          label='Password'
          inputOptions = {{
            type: 'password',
            required: true, 
            onChange: handleChange, 
            name: 'displayName',
            value: displayName, 
            }} 
        />

       
        <Button type='submit'>Sign In</Button>
        <Button onClick={signInWithGoogle}>Google Sign In</Button>
      </form>
    </div>
  )
}

export default SignInForm;