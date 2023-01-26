import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import * as notesService from '../utilities/notes-service';
import likeIco from '../components/like.png'
import commentIco from '../components/comment.png'
import shareIco from '../components/send.png'
import {Link} from 'react-router-dom'

const verbs = ['be', 'see', 'know', 'grow', 'discover', 'love', 'heal']


const HomePage = ({ user }) => {
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

    const [verb, setVerb] = useState('be')

    useEffect(() => {
        getNotes()
        const interval = setInterval(() => {
            for (let i = 0; i < verbs.length; i++) {
                let randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
                setVerb((verb) => randomVerb)
            }

        }, 1500)
        // ^ Above all, when using setInterval, it is imperative that you clear the scheduled interval once the component unmounts.
        return () => clearInterval(interval)

    }, [])

    return (
        <div className="main-container">
            <NavBar />
            <div className="header">
                <h1 className='header-title'>Welcome to the As You Are Community!</h1>
                <h2>A place where you can<span className='magic-word'> {verb}</span> yourself as you are.</h2>
            </div>
            { notes ? (
            <div className="home-cardcontainer">
                <div className="post-card">
                    <h2 className='card-title'>{notes[1].title}</h2>
                    <div className='post-card-body'>
                        <p>{notes[1].plainBody}
                        </p>
                    </div>
                    <div className="lower-card">
                        <div className='card-user'>
                            <img className='profile-pic' src={`/images/${notes[1].username}.png`}></img>
                            <p>@{notes[1].username}</p>
                        </div>
                        <div className="card-actions">
                            <img alt='heart icon' className='card-ico' src={likeIco} />
                            <img alt='comment icon'className='card-ico' src={commentIco} />
                            <img alt='share icon' className='card-ico' src={shareIco} />
                        </div>
                    </div>
                </div>
                <h2>Let's <span className=''>discover</span> ourselves, <span className='highlight-word'>together.</span></h2>
                <p>Please <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=msism720@gmail.com" target="_blank">contact me</a> if you would like a demo of the app before it's public release or if you would like to contribute to its development!</p>
            </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
}

export default HomePage