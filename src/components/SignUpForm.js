import { Component } from 'react';
import { signUp } from '../utilities/users-service';


// ^ src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)


export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      };

      handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value, error: ''})
      }

      handleSubmit = async (event) => {
        event.preventDefault()
        // alert(JSON.stringify(this.state))
        try {
            // ^ create formData to send to backend
            const formData = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            // ^ pass the formData to the SignUp function
            const user = await signUp(formData)
            // ^ using Signup from users-service on formData collected here
            const setUser = this.props.setUser
            setUser(user)
        } catch {
            // ^ if we have an error
            this.setState({error: 'Sign Up Failed - Try Again'})
        }
      }

      render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <h1>Sign-Up!</h1>
            <div className="form-container">
              <form className='form' autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input 
                type="text" 
                name="name" 
                value={this.state.name} 
                onChange={this.handleChange} required />
                <label>Email</label>
                <input 
                type="email" 
                name="email" 
                value={this.state.email} 
                onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
  }