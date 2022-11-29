import {convertToRaw} from 'draft-js'


const BASE_URL = '/api/notes';

export function create(noteData) {
    console.log('here micheal')
  return sendRequest(`${BASE_URL}`, 'POST', noteData)
}

export function getAllNotes() {
  console.log('here micheal')
  return sendRequest(`${BASE_URL}`, 'GET')
}
export function deleteNote(id) {
  console.log('delete micheal')
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

// ^ Helper Functions

async function sendRequest(url, method = 'GET', payload = null) {
    // ^ Fetch accepts an options object as the 2nd argument
    // ^ used to include a data payload, set headers, etc.
    const options = {method}
    if (payload) {
        // console.log(payload)
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload);
        options.headers = options.headers || {}
        // console.log(payload)
      }
    // ^ res.ok will be false if the status code set to 4xx in the controller action
    const res = await fetch(url, options);
    // ^ res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json(payload)
    throw new Error('Bad Request');
}

