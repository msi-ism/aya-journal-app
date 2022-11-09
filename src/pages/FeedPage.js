import UserNav from "../components/UserNav";


const FeedPage = () => {
    return (
        <div className='feed-container'>
            <div className='feed-header'>
            <h1>Hello FeedPage</h1>
            </div>
            <UserNav />
            <div className="scroll-container">
                <h1>Text Test</h1>
                <h1>Text Test</h1>
                <h1>Text Test</h1>
            </div>
            
        </div>
    );
}

export default FeedPage;
