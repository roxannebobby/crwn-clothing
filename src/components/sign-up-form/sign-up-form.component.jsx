import { useState } from 'react';

import {createAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  
  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password != confirmPassword) {
      alert('Passwords do not match')
      return;
    }
    try{
      const response = await createAuthUserWithEmailAndPassword(email, password);
      console.log(response);
    } catch (error) {
      console.log('user creation encountered an error', error)
    }

  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })

  };

  return (
    <div>
      <h1>Sign up with email and password</h1>

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
        
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;