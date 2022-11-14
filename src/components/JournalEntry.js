import { useState, useEffect } from "react"
import xIco from './x.png'
import TextEditor from "./TextEditor"
import questionBank from "../data/Questions"
import * as notesAPI from '../utilities/notes-api'
import {create} from '../utilities/notes-service'


const question = questionBank[4].body

let privatePost = false

let switchText = ''

const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}


const JournalEntry = ({user}) => {
    const [mode, setMode] = useState({})
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
        username: user.username,
        // notebook: this.state.email,
        title: question,
        body: body,
        public: privatePost ? false : true
    }
    create(noteData)
    console.log(noteData)
    closeWindow()
    setMode('Share')
  } catch {
    setError('Error getting data');
  }
}
    const publicMode = () => {
        let privacyBtn = document.querySelector('.privacy-btn')
        let inputText = document.querySelector('.input-text')
        switchText = 'is Public'
        privacyBtn.style.backgroundColor = 'green'
        let submitBtn = document.querySelector('.submit-btn')
        submitBtn.style.backgroundColor = 'green'
        submitBtn.textContent = 'Publish'
        inputText.textContent = 'is Public'
        console.log('public')
        privatePost = false
        console.log(privatePost)
    }

    const privateMode = () => {
        let privacyBtn = document.querySelector('.privacy-btn')
        let inputText = document.querySelector('.input-text')
        let submitBtn = document.querySelector('.submit-btn')
        switchText = 'is Private'
        submitBtn.style.backgroundColor = 'red'
        submitBtn.textContent = 'Save'
        privacyBtn.style.backgroundColor = 'maroon'
        inputText.textContent = 'is Private'
        console.log('is private again')
        privatePost = true
        setMode()
        console.log(privatePost)

    }

    const switchPrivacy = (mode) => {
        if (privatePost) {
            setMode(publicMode)
            console.log('private mode switched to public' + switchText)

        } else {
            setMode(privateMode)
            console.log('public mode switched to private' + switchText)
        }
    }

    useEffect(() => {
        let privacyBtn = document.querySelector('.privacy-btn')
        let submitBtn = document.querySelector('.submit-btn')
        publicMode()
    }, [])



    return (
        <div className='journal-container'>
            <div className='journal-canvas' onSubmit={handleSubmit}>
                <div className='upper-canvas'>
                    <div className="entry-pic">
                        <img className='profile-pic' src={`/images/${user.img}.png`}></img>
                        <p >{user.username}</p>
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
                        <input type='hidden' name='username' value={user.username}></input>
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
                        {'Switch Privacy:'}
                        <input type='checkbox' className='privacy-btn' onClick={switchPrivacy} value='test'/><span className='input-text'></span>
                        <button className='submit-btn' type='submit' onClick={handleSubmit}></button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default JournalEntry;
