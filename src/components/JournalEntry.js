import { useState, useEffect } from "react"
import xIco from './x.png'
import pp from './jp.jpeg'
const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}

let privatePost = true

const JournalEntry = ({user}) => {
    const [mode, setMode] = useState('Save')

    
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
            <div className='journal-canvas'>
                <div className='upper-canvas'>
                    <div className="entry-pic">
                        <img className='profile-pic' src={pp}></img>
                        <p>{user.name}</p>
                    </div>
                    <div className='canvas-title'>
                        <h1>Question Prompt or Title</h1>
                    </div>
                    <div className='canvas-exit' onClick={closeWindow}>
                        <img className='x-btn' src={xIco}></img>
                    </div>
                </div>
                <div className='body-canvas'>
                    <textarea placeholder="What's on your mind?"></textarea>
                </div>
                <div className='lower-canvas'>
                    <div className="submit-btns">
                        <input type='checkbox' className='privacy-btn' onClick={switchPrivacy}/>{privatePost ? 'Private' : 'Public'}
                        <button className='submit-btn' type='submit'>{mode}</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default JournalEntry;
