import likeIco from './like.png'
import commentIco from './comment.png'
import shareIco from './send.png'

const PostCard = () => {
    return (
        <div className="post-card">
                <h2>Post Question</h2>
            <div className='post-card-body'>
                <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                </p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat non tortor non venenatis. Nulla eget erat pellentesque, ultrices diam.
                </p>
            </div>
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
