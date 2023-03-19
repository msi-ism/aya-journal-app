import React from 'react';
import { useState, useEffect } from "react"
import xIco from './x.png'
import TextEditorEdit from "./TextEditorEdit"
import questionBank from "../data/Questions"
import * as notesAPI from '../utilities/notes-api'
import { editNote } from "../utilities/notes-api";
import {create} from '../utilities/notes-service'
import QuestionSelector from "./QuestionSelector"
import './JournalEditModal.css'


let privatePost = false

let switchText = ''

const questions = questionBank



const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-edit-container')
    journalCanvas.style.visibility = 'hidden'
}


const JournalEditModal = ({user, getNotes, setNotes, highlight, savedPlainBody, savedBody}) => {
    const [mode, setMode] = useState({})
    const [error, setError] = useState('');
    const [now, setNow] = useState()

    

// function handleChange(evt) {
//   setNote({ ...note, [evt.target.name]: evt.target.value });
//   setError('');
// }

const [body, setBody] = useState('')
const [plainBody, setPlainBody] = useState('')
const [question, setQuestion] = useState(highlight ? highlight.title : 'no highlight senor')

async function handleEdit(evt) {
  try {
    console.log('button working')
    let notebook = `${user.username}'s Notebook`
    const noteData = {
        author: user.name,
        username: user.username,
        notebook: notebook,
        title: question,
        body: body,
        plainBody: plainBody,
        public: privatePost ? false : true
    }
    editNote(evt, noteData)
    closeWindow()
    let newNotes = await getNotes()
    setNotes([...newNotes])
    setNow(newNotes)
    console.log('newNotes' + newNotes)
    // setMode('Share')
    console.log('event to edit' + evt)
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
        let textBox = document.querySelector('.public-DraftStyleDefault-block')
        publicMode()
        console.log('now notes are: ' + now)
    }, [question])



    return (
        <div className='journal-edit-container'>
            <div className='journal-canvas'>
                <div className='upper-canvas'>
                    <div className="entry-pic">
                        <img className='profile-pic' src={`/images/${user.username}.png`}></img>
                        <p >{user.username}</p>
                    </div>
                    <div className='canvas-title'>
                       <h1 className='edit-canvas-title'>{highlight.title}</h1>
                    </div>
                    <div className='canvas-exit' onClick={closeWindow}>
                        <img className='x-btn' src={xIco}></img>
                    </div>
                </div>
                <div className='body-canvas'>
                    <form onSubmit={() => handleEdit(highlight._id)}>
                        <input type='hidden' name='author' value={user.name}></input>
                        <input type='hidden' name='username' value={user.username}></input>
                        <input type='hidden' name="notebook" default={'default-tesst'}></input>
                        <input type='hidden' name='title' value={question}></input>
                        <input type='hidden' name='body' value={body}></input>
                        <input type='hidden' name='plainBody' value={plainBody}></input>
                        <input type='hidden' name='likes' value={0}></input>
                        <input type='hidden' name='public' value={privatePost ? true : false}></input>
                    </form>
                    <TextEditorEdit {...{setBody, setPlainBody, highlight, savedPlainBody, savedBody}} />

                </div>
                <div className='lower-canvas'>
                    <div className="submit-btns">
                        {'Switch Privacy:'}
                        <input type='checkbox' className='privacy-btn' onClick={switchPrivacy} value='test'/><span className='input-text'></span>
                        <button className='edit-submit-btn' type='submit' onClick={() => handleEdit(highlight._id)}>Save</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default JournalEditModal;