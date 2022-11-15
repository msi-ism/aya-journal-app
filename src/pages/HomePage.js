import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import * as notesService from '../utilities/notes-service';
import likeIco from '../components/like.png'
import commentIco from '../components/comment.png'
import shareIco from '../components/send.png'

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
                    <h2 className='card-title'>{notes[4].title}</h2>
                    <div className='post-card-body'>
                        <p>{notes[4].plainBody}
                        </p>
                    </div>
                    <div className="lower-card">
                        <div className='card-user'>
                            <img className='profile-pic' src={`/images/${notes[4].username}.png`}></img>
                            <p>@{notes[4].username}</p>
                        </div>
                        <div className="card-actions">
                            <img className='card-ico' src={likeIco} />
                            <img className='card-ico' src={commentIco} />
                            <img className='card-ico' src={shareIco} />
                        </div>
                    </div>
                </div>
            </div> ) : (
                <div>Loading</div>
            )}
            <Footer />
        </div>
    );
}

export default HomePage