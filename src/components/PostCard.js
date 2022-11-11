import likeIco from './like.png'
import commentIco from './comment.png'
import shareIco from './send.png'

const PostCard = () => {
    return (
        <div className="post-card">
            <h2>Post Question</h2>
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
                    <img className='card-ico' src={likeIco} />
                    <img className='card-ico' src={commentIco} />
                    <img className='card-ico' src={shareIco} />
                </div>
            </div>
        </div>
    );
}

export default PostCard;
