import { useEffect } from "react"

const closeWindow = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'hidden'
}


const JournalEntry = () => {
    // useEffect(() => {
    //     let journalCanvas = document.querySelector('.journal-container')

    // }, [])
    
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
                    
                </div>

            </div>
            
        </div>
    );
}

export default JournalEntry;
