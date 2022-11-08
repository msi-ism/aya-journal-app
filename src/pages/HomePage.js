import PostCard from "../components/PostCard";

const HomePage = () => {
        return (
            <div className="main-container">
                <div className="header">
                    <h1>Welcome Home!</h1>
                </div>
                <div className="home-cardcontainer">
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        );
    }

export default HomePage