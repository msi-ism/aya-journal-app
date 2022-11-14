
import { Link } from 'react-router-dom'
import * as userService from '../utilities/users-service'


const UserNav = ({user, setUser}) => {
    const handleLogOut = () => {
        userService.logOut()
        setUser(null)
    }
    return (
        <div className='user-nav'>
            <div className="user-nav-item user-block">
                <img className='profile-pic' src={`/images/${user.img}.png`}/>
                <h4>{user.name}</h4>
            </div>
            <div className='user-links'>
                <Link to='/home' className='user-nav-item user-link'>Home</Link>
                <div className='user-nav-item user-link'>Assessments</div>
                <div className='user-nav-item user-link'>Browse Prompts</div>
                <div className='user-nav-item user-link'>Journals</div>
            </div>
            <div className='acct-block'>
                <div className="acct-link">Account Settings</div>
                <Link className="acct-link" onClick={handleLogOut}>SignOut</Link>
            </div>
        </div>
    );
}

export default UserNav;
