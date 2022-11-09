import profilePic from './account.png'


const UserNav = () => {
    return (
        <div className='user-nav'>
            <div className="user-nav-item user-block">
                <img className='profile-pic' src={profilePic}/>
                <h4>User Block</h4>
            </div>
            <div className='user-links'>
                <div className='user-nav-item user-link'>Link 1</div>
                <div className='user-nav-item user-link'>Link 2</div>
                <div className='user-nav-item user-link'>Link 3</div>
            </div>
            <div className='acct-block'>
                <div className="user-nav-item acct-link">Account Link 1</div>
                <div className="user-nav-item acct-link">Account Link 2</div>
            </div>
        </div>
    );
}

export default UserNav;
