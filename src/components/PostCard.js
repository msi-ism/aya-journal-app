

const PostCard = () => {
    return (
        <div className="post-card">
            <h3>Post Question</h3>
            <h2>Post Title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat non tortor non venenatis. Nulla eget erat pellentesque, ultrices diam.
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat non tortor non venenatis. Nulla eget erat pellentesque, ultrices diam.
            </p>
            <div className="lower-card">
                <div className='card-user'>
                    <p>Username</p>
                </div>
                <div className="card-actions">
                    <p>Claps</p>
                    <p>Comments</p>
                    <p>Share</p>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
