import { Link } from 'react-router-dom'
import * as userService from '../utilities/users-service'
import {getUser} from '../utilities/users-service'
import {useState} from 'react'
import logo from './AYA2022Logo.png'


const NavBar = () => {
    const [user,  setUser] = useState(getUser())
    {console.log(user)}
    const handleLogOut = () => {
        userService.logOut()
        setUser(null)
    }
    return(
        <nav className='navbar'>
        <div className='navlogo'>
            <img className='logo' src={logo} alt='Logo'/>
        </div>
        <div className='navmenu'>
            {/* {!user ? <Link to='/auth'>SignUp</Link> : null} */}
            <Link to={{pathname: "https://github.com/msi-ism/aya-journal-app"}}>{" "}{" "}About</Link>
            {user ? <><span className='navname'>  Welcome, {user.name} <Link className='navname' to='' onClick={handleLogOut}>Log Out</Link></span></> : ''}
        </div>
    </nav>
    )
}

export default NavBar