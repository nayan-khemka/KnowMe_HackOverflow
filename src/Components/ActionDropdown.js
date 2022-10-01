import Dropdown from 'react-bootstrap/Dropdown';
import '../Pages/CSS/ActionDropdown.css'
import Switch from './Switch';

const ActionDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic">
      <i className="fa-solid fa-ellipsis fa-2x"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className='actionMenu'>
        <Dropdown.Item className='itemDropdown' href="#/action-1">Assign</Dropdown.Item>
        <Dropdown.Item className='itemDropdown' href="#/action-2">Update</Dropdown.Item>
        <Dropdown.Item className='itemDropdown' href="#/action-3">Delete</Dropdown.Item>
        <div className='d-flex'><Dropdown.Item className='itemDropdown' href="#/action-4">Status </Dropdown.Item><Switch/></div>
        
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ActionDropdown;