import { Link } from 'react-router-dom'
import * as userService from '../utilities/users-service'
import logo from './AYA2022Logo.png'


const NavBar = ({user, setUser}) => {
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
            <Link to='/auth'>SignUp</Link> {" "}{" "}
            <Link to='/orders/new'>New Order</Link>
            {user ? <><span className='navname'>  Welcome, {user.name} <Link className='navname' to='' onClick={handleLogOut}>Log Out</Link></span></> : ''}
        </div>
    </nav>
    )
}

export default NavBar