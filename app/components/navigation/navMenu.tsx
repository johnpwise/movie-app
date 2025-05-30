import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function NavMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Nav
      activeKey={location.pathname}
      onSelect={(selectedKey) => {
        // selectedKey will be whatever you set in eventKey
        if (typeof selectedKey === 'string') {
          navigate(selectedKey);
        }
      }}
    >
      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="/"
          eventKey="/"
        >
          Dashboard
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="/movies"
          eventKey="/movies"
        >
          Movies
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          to="/actors"
          eventKey="/actors"
        >
          Actors
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavMenu;
