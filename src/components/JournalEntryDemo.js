import { useState, useEffect } from "react"
import xIco from './x.png'
import TextEditorDemo from "./TextEditorDemo"
import questionBank from "../data/Questions"
import * as notesAPI from '../utilities/notes-api'
import {create} from '../utilities/notes-service'
import QuestionSelector from "./QuestionSelector"
import './JournalEntryDemo.css'

const questions = questionBank

let privatePost = false
let switchText = ''



const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}


const JournalEntryDemo = ({user, getNotes}) => {
    const [mode, setMode] = useState({})
    const [error, setError] = useState('');
    const [focus, setFocus] = useState(0)

const [question, setQuestion] = useState('')

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
        // let privacyBtn = document.querySelector('.privacy-btn')
        // let submitBtn = document.querySelector('.submit-btn')
        // publicMode()
        let textBox = document.querySelector('.public-DraftStyleDefault-block')
        let textContainer = document.querySelector('.public-DraftEditorPlaceholder-root')
        let tickComplete = false
        const checkComplete = () => {
            tickComplete = true
        }
        const animateTextBox = () => {
            textContainer.textContent = ''
            let displayText = 'Growing up without my parents gave me a bit of a superhero complex...'
            let splitText = Array.from(displayText)
            console.log(splitText)
            for (let i = 0; i < splitText.length; i++) {
                textBox.innerHTML += `<span class='split'>${splitText[i]}</span>`
            }
            const onTick = () => {
                const span = textBox.querySelectorAll('.split')[char]
                span.classList.add('fade')
                char++
                if (char === splitText.length) {
                    // ^ if char length is equal to the length of the split text array, run complete function which stops
                    complete()
                    return
                }
            }
            let char = 0
            // ^ Setting an interval that runs onTick every .5 secs - below is where onTick is being called
            let timer = setInterval(onTick, 50)
            let tickLength = 1750
            const complete = () => {
                // ^ Timeout function that runs "checkComplete" after the ticklength
                setTimeout(checkComplete, tickLength)
                clearInterval(timer)
                timer = null;
            }
        }    
        const timeout = setTimeout(() => {
          animateTextBox()
        }, 2000)  
        return () => clearTimeout(timeout)

    }, [focus])

    console.log(focus)

    return (
        <div className='journal-demo-container'>
            <div className='journal-demo-canvas'>
                <div className='upper-canvas'>
                    <div className="entry-pic-demo">
                        <img className='profile-pic-demo' src={`/images/bigBruce.png`}></img>
                        <p >@bigBruce</p>
                    </div>
                    <div className='canvas-title-demo'>
                        <QuestionSelector setQuestion={setQuestion}/>
                    </div>
                </div>
                <div className='body-canvas' >
                   
                    {/* <textarea placeholder="What's on your mind?"></textarea> */}
                    <TextEditorDemo setFocus={setFocus} focus={focus}/>
                </div>
                <div className='lower-canvas'>
                    <div className="submit-btns">
                        {/* <input type='checkbox' className='privacy-btn' onClick={switchPrivacy} value='test'/><span className='input-text'></span> */}
                        <button className='submit-btn' type='submit' >Publish</button>
                    </div>
                </div>

            </div>

        </div>
    );
}
export default JournalEntryDemo;
