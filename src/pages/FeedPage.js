import UserNav from "../components/UserNav";
import PostCard from "../components/PostCard";
import JournalEntry from "../components/JournalEntry";
import {useEffect} from 'react'

const handleClick = () => {
    let journalCanvas = document.querySelector('.journal-container')
    journalCanvas.style.visibility = 'visible'
    }




const FeedPage = ({user}) => {
    useEffect(() => {
        let journalCanvas = document.querySelector('.journal-container')
        journalCanvas.style.visibility = 'hidden'
        console.log(journalCanvas)
    }, [])
    
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
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
            <JournalEntry user={user}/>
            
        </div>
    );
}

export default FeedPage;
