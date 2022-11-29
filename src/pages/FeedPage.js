import UserNav from "../components/UserNav";
import PostCard from "../components/PostCard";
import JournalEntry from "../components/JournalEntry";
import * as notesService from '../utilities/notes-service';
import { useState, useEffect } from 'react'
import likeIco from '../components/like.png'
import commentIco from '../components/comment.png'
import shareIco from '../components/send.png'
import dotsIco from '../components/dots.png'
import convertFromRaw from 'draft-js'
import questionBank from "../data/Questions"
import EditModal from "../components/EditModal";
import { deleteNote, editNote } from "../utilities/notes-api";



const questions = questionBank


const handleClick = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'visible'
}

const FeedPage = ({ user }) => {
    const [notes, setNotes] = useState()

    const getNotes = async () => {
        try {
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

    const handleEditModal = (evt) => {
        console.log(evt.target.id)
        let editModal = document.querySelectorAll(`.options-container`)
        notes.map((note, idx) => {
            if (note.username === user.username && note._id === evt.target.id) {
                console.log(note._id)
                console.log(evt.target.id)
                console.dir(editModal)
                console.log('true')
                editModal[idx].style.visibility = 'visible'
            } else {
                
            }
        })
    }

    const clearModal = (evt) => {
            let editModal = document.querySelector(`.options-container`)
            console.dir(editModal)
            editModal.style.visibility = 'hidden'
    }

    const handleDelete = async (evt) => {
        console.log(evt)
        const notes = await deleteNote(evt)
        console.log(notes)
        clearModal()
        setNotes(notes)
    }
    const handleEdit = async (evt) => {
        handleClick()
        const notes = await editNote(evt)
        // console.log(notes)
        // clearModal()
        // setNotes(notes)
    }

    document.body.addEventListener('click', clearModal, true);



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
                                            <img className='profile-pic' src={user.img ? `/images/${note.username}.png` : `/images/account.png`}></img>
                                            <p>@{note.username}</p>
                                        </div>
                                        <div className="card-actions">
                                            <img className='card-ico' src={likeIco} />
                                            <img className='card-ico' src={commentIco} />
                                            <img id={note._id} className='card-ico' onClick={handleEditModal} src={dotsIco} />
                                        </div>
                                        <div className='options-container'>
                                            <h4 className="edit-btn" onClick={() => handleEdit(note._id)}>Edit</h4>
                                            <h4 className="del-btn" onClick={() => handleDelete(note._id)}>Delete</h4>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul> :
                    <PostCard notes={notes} />
                }
            </div>
            <JournalEntry user={user} getNotes={getNotes} notes={notes} />


        </div>
    );
}

export default FeedPage;
