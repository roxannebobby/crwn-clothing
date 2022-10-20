import { useState } from 'react';

<<<<<<< HEAD
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
=======
>>>>>>> parent of d7a2a91 (form input component is set up)
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('Passwords do not match')
      return;
    }
    try{
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
    
        await createUserDocumentFromAuth(user, [displayName]);
        resetFormFields();


    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user. Email already in use.')
      }
      else {
      console.log('user creation encountered an error', error)
    }}

  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })

  };

  return (
    <div>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>

      <form onSubmit = {handleSubmit}>
      
        <label>Name</label>
        <input 
          type='text' 
          required 
          onChange={handleChange} 
          name='displayName' 
          value={displayName} />

        <label>Email</label>
        <input 
          type='email' 
          name='email' 
          required 
          onChange={handleChange} 
          value={email} />

        <label>Password</label>
        <input 
          type='password' 
          name='password' 
          required 
          onChange={handleChange}
          value={password} />

        <label>Confirm Password</label>
        <input 
          type='password' 
          name='confirmPassword' 
          required 
          onChange={handleChange}
          value={confirmPassword} />
        
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;