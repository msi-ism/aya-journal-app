import * as notesAPI from './notes-api'

export async function create(noteData) {
    // ^ Delegate the network request code to the users-api.js API module
    // ^ which will ultimately return a JSON Web Token (JWT)
    const note = await notesAPI.create(noteData);
    console.log('note' + note)
    // ^ Note: We have not used a try/catch block because any error will propagate up to the "consumer" of the service - in this case the consumer is the handleSubmitmethod in the <SignUpForm>component.
  }

  export async function getAllNotes() {
    console.log('working')
    const data = await notesAPI.getAllNotes()
    console.log(data)
    return data

  }

