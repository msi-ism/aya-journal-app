import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const verbs = ['be', 'see', 'know', 'grow', 'discover', 'love', 'heal']


const HomePage = () => {
    const [verb, setVerb] = useState('be')

    useEffect(() => {
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
            <div className="header">
                <h1>Welcome to the As You Are Community!</h1>
                <h2>A place where you can<span className='magic-word'> {verb}</span> yourself as you are.</h2>
            </div>
            <div className="home-cardcontainer">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage