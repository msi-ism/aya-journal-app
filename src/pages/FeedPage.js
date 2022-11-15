import UserNav from "../components/UserNav";
import PostCard from "../components/PostCard";
import JournalEntry from "../components/JournalEntry";
import * as notesService from '../utilities/notes-service';
import {useState, useEffect} from 'react'

const handleClick = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'visible'
    }





const FeedPage = ({user, allNotes}) => {
    const [notes, setNotes] = useState(null)
    
    const getNotes = async () => {
        try {
            console.log('got em')
            const data = await notesService.getAllNotes()
            console.log(data)
            setNotes(data)
            console.log('got notes')
            // ^ using Signup from users-service on formData collected here

        } catch {
            // ^ if we have an error
            this.setState({error: "Can't get notes"})
        }
      }

    useEffect(() => {
        let journalCanvas = document.querySelector('.journal-container')
        journalCanvas.style.visibility = 'hidden'
        getNotes()

    }, [])

    console.log(notes)
    
    return (
        <div className='feed-container'>
            <div className='feed-header'>
                <h1>Feed Page</h1>
                <input className='new-post-btn btn' type='button' value='Create New Post' onClick={handleClick}></input>
            </div>
            <UserNav user={user}/>
            <div className="scroll-container">
                <h1>Question of the Day</h1>
                <PostCard />
            </div>
            <JournalEntry user={user}/>
            
        </div>
    );
}

export default FeedPage;
