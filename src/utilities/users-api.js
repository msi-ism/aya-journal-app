import { getToken } from './users-service'

// // ^ This is the base path of the Express route we'll define
// const BASE_URL = '/api/users'
// const LOGIN_URL = '/api/users/login'


// export async function signUp(userData) {
//     console.log(userData)
//       // ^ Fetch uses an options object as a second arg to make requests
//      //  ^ other than basic GET requests, include data, headers, etc.
//     const res = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         // ^ Fetch requires data payloads to be stringified
//         //  ^ and assigned to a body property on the options object
//         body: JSON.stringify(userData)
//     })
//     console.log(res)
//      // ^ Check if request was successful
//     if (res.ok) {
//         return res.json()
//     // ^ res.json() will resolve to the JWT
//     } else {
//         // ^ 'throw is a keyword to create custom error messages 
//         throw new Error('Invalid Sign Up')
//     }
// }

// // ! IMPORTANT: The fetch method will not raise an error unless there's a network failure. This is why we need to check the res.okproperty to see if the server returned a successful response (status code in the 200s).



// export async function login(userData) {
//     console.log(userData)
//     const res = await fetch(LOGIN_URL, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(userData)
//     })
//     console.log(res)

//     if (res.ok) {
//         return res.json()
//     } else {
//         throw new Error(`We're having trouble logging you in. Please try again.`)
//     }
// } 

// ^ Above is the original method. Below is the refactored method to make the code more DRY



// ! Tip: Making code more DRY usually consists of recognizing repeated code, identifying what varies between the two or more functions and define those as parameters (inputs) in a new function the existing functions can invoke.

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData)
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
  }

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
    // ^ Fetch accepts an options object as the 2nd argument
    // ^ used to include a data payload, set headers, etc.
    const options = {method}
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload);
      }
    // ^Add the below code
    const token = getToken();
    if (token) {
      // ^ Ensure the headers object exists
      options.headers = options.headers || {}
      // ^ Add token to an Authorization header
      // ^ Prefacing with 'Bearer' is recommended in the HTTP specification
      options.headers.Authorization = `Bearer ${token}`
      console.log(options.headers.Authorization)
    }
    // ^ res.ok will be false if the status code set to 4xx in the controller action
    const res = await fetch(url, options);
    // ^ res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json()
    throw new Error('Bad Request');
}



// ! Note: The sendRequestfunction always returns a promise and we are passing that promise to the caller of checkToken.