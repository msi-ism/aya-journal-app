import { getToken } from './users-service'

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
        console.log(payload)
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