import { useState, useEffect } from "react"
import xIco from './x.png'
import pp from './jp.jpeg'
import TextEditor from "./TextEditor"
import questionBank from "../data/Questions"
import * as notesAPI from '../utilities/notes-api'
import {create} from '../utilities/notes-service'

const question = questionBank[1].body


const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}

let privatePost = true

const JournalEntry = ({user}) => {
    const [mode, setMode] = useState('Save')
    const [note, setNote] = useState({
        // notebook: '',
        title: '',
        body: ''
    })

    const [error, setError] = useState('');

function handleChange(evt) {
  setNote({ ...note, [evt.target.name]: evt.target.value });
  setError('');
}
    const [body, setBody] = useState('')

async function handleSubmit(evt) {
  // Prevent form from being submitted to the server
  evt.preventDefault();
  try {
    console.log('button working')
    console.log(body)
    const noteData = {
        author: user.name,
        // notebook: this.state.email,
        title: question,
        body: body,
        public: privatePost ? true : false
    }
    create(noteData)
    console.log(noteData)
    closeWindow()
  } catch {
    setError('Error getting data');
  }
}

    const switchPrivacy = (mode) => {
        if (privatePost) {
            setMode('Share')
            privatePost = false
            let privacyBtn = document.querySelector('.privacy-btn')
            privacyBtn.style.backgroundColor = 'green'
            let submitBtn = document.querySelector('.submit-btn')
            submitBtn.style.backgroundColor = 'green'
            console.log('public')
        } else {
            setMode('Save')
            privatePost = true
            let privacyBtn = document.querySelector('.privacy-btn')
            let submitBtn = document.querySelector('.submit-btn')
            submitBtn.style.backgroundColor = 'red'
            privacyBtn.style.backgroundColor = 'maroon'
            console.log('is private again')
        }
    }

    useEffect(() => {
        let privacyBtn = document.querySelector('.privacy-btn')
        let submitBtn = document.querySelector('.submit-btn')
        privacyBtn.textContent = 'Private'
        console.log(privacyBtn)
    }, [])

    return (
        <div className='journal-container'>
            <div className='journal-canvas' onSubmit={handleSubmit}>
                <div className='upper-canvas'>
                    <div className="entry-pic">
                        <img className='profile-pic' src={pp}></img>
                        <p name='name' >{user.name}</p>
                    </div>
                    <div className='canvas-title'>
                        <h1>{question}</h1>
                    </div>
                    <div className='canvas-exit' onClick={closeWindow}>
                        <img className='x-btn' src={xIco}></img>
                    </div>
                </div>
                <div className='body-canvas'>
                    <form onSubmit={handleSubmit}>
                        <input type='hidden' name='author' value={user.name}></input>
                        <input type='hidden' name="notebook" value={'default'}></input>
                        <input type='hidden' name='title' value={question}></input>
                        <input type='hidden' name='body' value={body}></input>
                        <input type='hidden' name='likes' value={0}></input>
                        <input type='hidden' name='public' value={privatePost ? true : false}></input>
                    </form>
                    {/* <textarea placeholder="What's on your mind?"></textarea> */}
                    <TextEditor {...{setBody, handleSubmit}} />
                </div>
                <div className='lower-canvas'>
                    <div className="submit-btns">
                        <input type='checkbox' className='privacy-btn' onClick={switchPrivacy}/>{privatePost ? 'Private' : 'Public'}
                        <button className='submit-btn' type='submit' onClick={handleSubmit}>{mode}</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default JournalEntry;
