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
import editIco from '../components/edit.png'
import trashIco from '../components/trash.png'
import JournalEditModal from '../components/JournalEditModal';
import { Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw, ContentState } from 'draft-js'
import RichTextPreview from '../components/RichTextPreview';


const JournalPage = ({ user }) => {
    const [notes, setNotes] = useState([])
    const [highlight, setHighlight] = useState({})
    const [savedPlainBody, setSPB] = useState('')
    const [savedBody, setSavedBody] = useState('')
    const [journalPreview, setJournalPreview] = useState('')
    const loggedInUser = user.username

    const getNotes = async () => {
        try {
            const data = await notesService.getUsersNotes(loggedInUser)
            setNotes(data)
            console.log('notes ' + data)

        } catch (error) {
            // ^ if we have an error
            console.log(error)
            // this.setNotes({ error: "Can't get notes" })
        }
    }

    const handleClick = () => {
        let journalCanvas = document.querySelector('.journal-container')
        journalCanvas.style.visibility = 'visible'
    }


    let selectedNote = ''
    const handleEditModal = (evt) => {
        let journalCanvas = document.querySelector('.journal-edit-container')
        journalCanvas.style.visibility = 'visible'
        selectedNote = notes.filter(note => note._id.includes(evt))
        console.log(evt)
        setHighlight(selectedNote[0])
        setSPB(selectedNote[0].plainBody)
        setSavedBody(selectedNote[0].body)
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
        // setNotes(notes)
        // deleteNote(evt)
        getNotes()
    }
    const handleEdit = async (evt) => {
        // console.log(highlight[0])
        console.log(evt)
    }


    // document.body.addEventListener('click', clearModal);

    const convertDate = (dbDate) => {
        let date = new Date(dbDate)
        return date.toDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    useEffect(() => {
        getNotes()
    }, [])


    return (
        <div className='page-container'>
            <div className='create-new-entry-div'>
                <h1 className='journal-page-header'>My Journals</h1>
                <button onClick={handleClick} className='create-new-entry-btn'>Create New Entry</button>
            </div>
            <div className="notebook-container">
                {notes ?
                    <ul className='journals-list'>
                        {notes.flatMap((note, idx) => (
                            <li key={idx} className='journal-entry entry-cover' >
                                <div className="entry-header" onClick={() => handleEditModal(note._id)}>
                                    <h2 className='entry-title'>{note.title}</h2>
                                </div>
                                <div className='entry-body' onClick={() => handleEditModal(note._id)}>
                                    {/* <p>{note.plainBody}</p> */}
                                    <RichTextPreview {...{ user, highlight, savedPlainBody, journalPreview, note, getNotes }}  />
                                </div>
                                <div className="entry-lower">
                                    {/* <div className='journal-user'>
                                        <img className='profile-pic' src={user.img ? `/images/${note.username}.png` : `/images/account.png`}></img>
                                        <p>@{note.username}</p>
                                    </div> */}
                                    <div className='time-stamp'>
                                        <p>{convertDate(note.created_at)}</p>
                                    </div>
                                    <div id='edit-modal-box' className='options-container'>
                                        {/* <img className="edit-btn" onClick={() => handleEdit(note._id)} src={editIco}></img> */}
                                        <img className="del-btn" onClick={() => handleDelete(note._id)} src={trashIco}></img>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul> :
                    'No notes: Loading '
                }
            </div>
            <JournalEntry {...{user, setNotes, getNotes}}/>
            <JournalEditModal {...{user, highlight, savedPlainBody, notes, savedBody, setNotes}} />
        </div>
    );
}

export default JournalPage;
