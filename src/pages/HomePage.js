import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import * as notesService from '../utilities/notes-service';
import likeIco from '../components/like.png'
import commentIco from '../components/comment.png'
import shareIco from '../components/send.png'
import { Link } from 'react-router-dom'
import JournalEntryDemo from "../components/JournalEntryDemo";

const verbs = ['be', 'see', 'know', 'grow', 'discover', 'love', 'heal']


const HomePage = ({ user }) => {
    const [notes, setNotes] = useState()
    const [display, setDisplay] = useState('')

    // const getNotes = async () => {
    //     try {
    //         console.log('got em')
    //         const data = await notesService.getAllNotes()
    //         console.log(data)
    //         setNotes(data)
    //         console.log('got notes')
    //         // ^ using Signup from users-service on formData collected here

    //     } catch (error) {
    //         // ^ if we have an error
    //         console.log(error)
    //         // this.setNotes({ error: "Can't get notes" })
    //     }
    // }

    const [verb, setVerb] = useState('be')

    useEffect(() => {
        setDisplay('Growing up without parents is tough.')
    }, [])

    return (
        <div className="main-container">
            <div className="header">
                <h1 className='header-title'>Welcome to the As You Are app!</h1>
                <h2>A place to get to<span className='magic-word'> know</span> yourself.</h2>
            </div>
                <div className="home-demo-container">
                    <JournalEntryDemo display={display}/>
                </div>
            <h2>Let's <span className=''>discover</span> ourselves, <span className='highlight-word'>together.</span></h2>
            <p>Please <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=msism720@gmail.com" target="_blank">contact me</a> if you would like a demo of the app before it's public release or if you would like to contribute to its development!</p>
        </div>
    );
}

export default HomePage