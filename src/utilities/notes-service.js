import * as notesAPI from './notes-api'

export async function create(newNote) {
    // ^ Delegate the network request code to the users-api.js API module
    // ^ which will ultimately return a JSON Web Token (JWT)
    const note = await notesAPI.create(newNote);
    // ^ Note: We have not used a try/catch block because any error will propagate up to the "consumer" of the service - in this case the consumer is the handleSubmitmethod in the <SignUpForm>component.
  }