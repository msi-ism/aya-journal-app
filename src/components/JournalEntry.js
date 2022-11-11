import { useState, useEffect } from "react"

const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}

let privatePost = true

const JournalEntry = () => {
    const [mode, setMode] = useState('Private')

    
    const switchPrivacy = (mode) => {
        if (privatePost) {
            setMode('Publish')
            privatePost = false
            console.log('public')
        } else {
            setMode('Save')
            privatePost = true
            console.log('is private again')
        }
    }

    

    useEffect(() => {
        let privacyBtn = document.querySelector('.privacy-btn')
        privacyBtn.textContent = 'Private'
        console.log(privacyBtn)
    }, [])

    return (
        <div className='journal-container'>
            <div className='journal-canvas'>
                <div className='upper-canvas'>
                    <div className='canvas-title'>
                        <h1>Question Prompt or Title</h1>
                    </div>
                    <div className='canvas-exit' onClick={closeWindow}>
                        X
                    </div>
                </div>
                <div className='body-canvas'>
                    <textarea placeholder="What's on your mind?"></textarea>
                </div>
                <div className='lower-canvas'>
                    <button className='privacy-btn' onClick={switchPrivacy}>{privatePost ? 'Private' : 'Public'}</button>
                    <button className='privacy-btn' type='submit'>{mode}</button>
                </div>

            </div>

        </div>
    );
}

export default JournalEntry;
