import React from 'react';
import '../components/JournalPage.css'
import '../components/JournalEntry.css';
import JournalEntry from '../components/JournalEntry';
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

const handleClick = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'visible'
}


const JournalPage = ({ user }) => {
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
        let editModal = document.getElementById('edit-modal-box')
        console.dir(editModal)
        editModal.style.visibility = 'hidden'
        console.log('hidden completed')
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

    document.body.addEventListener('click', clearModal);



    useEffect(() => {
        let journalCanvas = document.querySelector('.journal-container')
        journalCanvas.style.visibility = 'hidden'
        getNotes()

    }, [])
    return (
        <div className='page-container'>
            <h1>My Journals</h1>
            <div className='create-new-entry-div' onClick={handleClick}>
                    <button className='create-new-entry-btn'>Create New Entry</button>
                </div>
            <div className="notebook-container">
                {notes ?
                    <ul className='journals-list'>
                        {notes.map((note, idx) => (
                            <li key={idx} className='journal-entry'>
                                <div className="entry-header">
                                    <h2 className='entry-title'>{note.title}</h2>
                                    <div className='entry-body'>
                                        <p>{note.plainBody}
                                        </p>
                                    </div>
                                    <div className="entry-lower">
                                        <div className='journal-user'>
                                            <img className='profile-pic' src={user.img ? `/images/${note.username}.png` : `/images/account.png`}></img>
                                            <p>@{note.username}</p>
                                        </div>
                                        <div className="card-actions">
                                            <img className='card-ico' src={likeIco} />
                                            <img className='card-ico' src={commentIco} />
                                            {note.username === user.username ? <img id={note._id} className='card-ico' onClick={handleEditModal} src={dotsIco} /> : null}
                                        </div>
                                        <div id='edit-modal-box' className='options-container'>
                                            <h4 className="edit-btn" onClick={() => handleEdit(note._id)}>Edit</h4>
                                            <h4 className="del-btn" onClick={() => handleDelete(note._id)}>Delete</h4>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul> :
                    'Loading'
                }
            </div>
            <JournalEntry user={user} />
        </div>
    );
}

export default JournalPage;
