import {convertToRaw} from 'draft-js'


const BASE_URL = '/api/notes';

export function create(newNote) {
  return sendRequest(BASE_URL, 'POST', newNote)
}

export function submitPage() {
    const bodyData = async (data) => {
    const content = JSON.stringify(convertToRaw(data));
    }
}

// ^ Helper Functions

async function sendRequest(url, method = 'GET', payload = null) {
    // ^ Fetch accepts an options object as the 2nd argument
    // ^ used to include a data payload, set headers, etc.
    const options = {method}
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload);
      }
    // ^ res.ok will be false if the status code set to 4xx in the controller action
    const res = await fetch(url, options);
    // ^ res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json()
    throw new Error('Bad Request');
}
