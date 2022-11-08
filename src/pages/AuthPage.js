import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"

const AuthPage = (props) => {
    const [showSignUp, setShowSignUp] = useState(true)
    const {setUser} = props
    const loginText = document.querySelector('.login-text')
    const loginLink = document.querySelector('.login-link')
    let linkText = ''
    let loginSentence = ''
    if (showSignUp) {
        linkText = ' Login'
        loginSentence = 'Already have an account?'
    } else {
        linkText = ' SignUp'
        loginSentence = 'Need an account?'
    }



    return(
        <main>
            <h1>Authentication Page</h1>
            <div>
                <p className="login-text">{loginSentence}<a className='login-link' href='#' onClick={event => {setShowSignUp(!showSignUp)}}>{linkText} </a></p>
                <div className='sign-up'>
                    {showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser}/>}
                </div>
            </div>
        </main>
    )
    
}

export default AuthPage