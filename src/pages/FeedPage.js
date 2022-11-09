import UserNav from "../components/UserNav";
import PostCard from "../components/PostCard";


const FeedPage = () => {
    return (
        <div className='feed-container'>
            <div className='feed-header'>
            <h1>FeedPage Header</h1>
            </div>
            <UserNav />
            <div className="scroll-container">
                <h1>Text Test</h1>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
            
        </div>
    );
}

export default FeedPage;
