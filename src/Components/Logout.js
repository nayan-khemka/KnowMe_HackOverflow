import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { clearToken } from '../util/authentication';
import '../Pages/CSS/Logout.css'

const Logout = () => {
  const handleLogout = () => {
    clearToken();
  }
  return (
    <Dropdown id='user'>
      <Dropdown.Toggle variant="" id="dropdown-basic">
        <img className='userProfile' src='http://182.70.249.68:9001/static/media/profile.5faf09a7795d28bf5a2b.png' alt='profile'></img>
      </Dropdown.Toggle>

      <Dropdown.Menu className='menu-dropdown'>
        <Dropdown.Item className='item-dropdown' href='/' onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Logout;