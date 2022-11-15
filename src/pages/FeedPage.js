import UserNav from "../components/UserNav";
import PostCard from "../components/PostCard";
import JournalEntry from "../components/JournalEntry";
import * as notesService from '../utilities/notes-service';
import { useState, useEffect } from 'react'
import likeIco from '../components/like.png'
import commentIco from '../components/comment.png'
import shareIco from '../components/send.png'
import convertFromRaw from 'draft-js'
import questionBank from "../data/Questions"


const question = questionBank[4].body


const handleClick = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'visible'
}





const FeedPage = ({ user}) => {
    const [notes, setNotes] = useState()

    const getNotes = async () => {
        try {
            console.log('got em')
            const data = await notesService.getAllNotes()
            console.log(data)
            setNotes(data)
            console.log('got notes')
            // ^ using Signup from users-service on formData collected here

        } catch (error) {
            // ^ if we have an error
            console.log(error)
            // this.setNotes({ error: "Can't get notes" })
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
            <UserNav user={user} />
            <div className="scroll-container">
                <h1 className='feed-title'>{question}</h1>
                {notes ?
                <ul className='feed-list'>
                    {notes.map((note, idx) => (
                        <li key={idx} className='post-list'>
                            <div className="post-card">
                                <h2 className='card-title'>{note.title}</h2>
                                <div className='post-card-body'>
                                    <p>{note.plainBody}
                                    </p>
                                </div>
                                <div className="lower-card">
                                    <div className='card-user'>
                                        <img className='profile-pic' src={`/images/${note.username}.png`}></img>
                                        <p>@{note.username}</p>
                                    </div>
                                    <div className="card-actions">
                                        <img className='card-ico' src={likeIco} />
                                        <img className='card-ico' src={commentIco} />
                                        <img className='card-ico' src={shareIco} />
                                    </div>
                                </div>
                            </div>

                        </li>


                    ))}
                </ul>  :
                <PostCard notes={notes} />
                    }
            </div>
            <JournalEntry user={user} />

        </div>
    );
}

export default FeedPage;
