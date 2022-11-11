import { useEffect } from "react"

const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}
let privatePost = true

const switchPrivacy = () => {
    let privacyBtn = document.querySelector('.privacy-btn')
    if (privatePost) {
        privacyBtn.textContent = 'Public'
        privatePost = false
    } else {
        privacyBtn.textContent = 'Private'
        privatePost = true
    }

}


const JournalEntry = () => {
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
                    <button className='privacy-btn' onClick={switchPrivacy}>Public</button>
                    <input type='submit' value='Publish'></input>
                </div>

            </div>
            
        </div>
    );
}

export default JournalEntry;
