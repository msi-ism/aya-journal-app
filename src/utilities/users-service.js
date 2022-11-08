import * as usersAPI from './users-api'

export async function signUp(userData) {
    // ^ Delegate the network request code to the users-api.js API module
    // ^ which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token)
    // ^ Note: We have not used a try/catch block because any error will propagate up to the "consumer" of the service - in this case the consumer is the handleSubmitmethod in the <SignUpForm>component.
    return getUser()
  }

  export async function login(userData) {
    console.log(userData)
    const token = await usersAPI.login(userData)
    localStorage.setItem('token', token)
    // console.log(token)
    return getUser()
  }

  export function getToken(){
    // ^ get token from local storage
    const token = localStorage.getItem('token')
    if (!token) return null
    // ^ we DO have token, get the payload
    const payload = JSON.parse(atob(token.split('.')[1]))

    if (payload.exp < Date.now() / 1000){
      localStorage.removeItem('token')
      return null
    }
    return token
  }


  export function getUser() {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

  
  export function checkToken() {
    return usersAPI.checkToken().then(dateStr => new Date(dateStr))


  }



  export function logOut() {
    localStorage.removeItem('token')
  }