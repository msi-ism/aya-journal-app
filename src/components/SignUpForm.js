import { Component } from 'react';
import { signUp } from '../utilities/users-service';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';


// ^ src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)


export default function SignUpForm({ setUser }) {
  const navigate = useNavigate()

  const [info, setInfo] = useState({
        name: '',
        username: '',
        email: '',
        // img: '',
        password: '',
        confirm: '',
        error: ''
      })

    const [error, setError] = useState('')

     function handleChange(evt) {
        setInfo({ ...info, [evt.target.name]: evt.target.value}) 
        setError('')
      }

      async function handleSubmit(evt) {
        evt.preventDefault()
        // alert(JSON.stringify(this.state))
        try {
            // ^ create formData to send to backend
            const formData = {
                name: info.name,
                username: info.username,
                email: info.email,
                // img: this.state.img,
                password: info.password
            }
            // ^ pass the formData to the SignUp function
            const user = await signUp(formData)
            // ^ using Signup from users-service on formData collected here
            setUser(user)
            navigate('/')
        } catch {
            // ^ if we have an error
            setError('Sign Up Failed - Try Again')
        }
      }
  
        const disable = info.password !== info.confirm;

        return (
          <div>
            <h1>Sign-Up!</h1>
            <div className="form-container">
              <form className='form' autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label>
                <input 
                type="text" 
                name="name" 
                value={info.name} 
                onChange={handleChange} required />
                <label>Username</label>
                <input 
                type="text" 
                name="username" 
                value={info.username} 
                onChange={handleChange} required />
                <label>Email</label>
                <input 
                type="email" 
                name="email" 
                value={info.email} 
                onChange={handleChange} required />
                {/* <label>IMG</label>
                <input 
                type="text" 
                name="img" 
                value={this.state.img} 
                onChange={this.handleChange} required /> */}
                <label>Password</label>
                <input type="password" name="password" value={info.password} onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={info.confirm} onChange={handleChange} required />
                <button className='signup-btn' type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{error}</p>
          </div>
        );
      }
  