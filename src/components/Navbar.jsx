import { Container, Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import logo from '../assets/react.svg';

const BasicExample = () => {
  const [activeLink, setActiveLink] = useState('home');
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar>
      <Container>
        <Nav>
          <div className="social-icon">
            <a
              href="https://www.linkedin.com/in/anthony-muniz-bueno-644648215/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={logo} alt="" />
            </a>
          </div>
          <Nav.Link
            href="#home"
            className={
              activeLink === 'home' ? 'active navbar-link' : 'navbar-link'
            }
            onClick={() => onUpdateActiveLink('home')}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="#quiz"
            className={
              activeLink === 'quiz' ? 'active navbar-link' : 'navbar-link'
            }
            onClick={() => onUpdateActiveLink('skills')}
          >
            Quiz
          </Nav.Link>
          <Nav.Link
            href="#results"
            className={
              activeLink === 'results' ? 'active navbar-link' : 'navbar-link'
            }
            onClick={() => onUpdateActiveLink('projects')}
          >
            Results
          </Nav.Link>
          <Nav.Link className="navbar-text">
            <button
              onClick={() =>
                (window.location.href = 'mailto:anthony.munizbueno@gmail.com')
              }
            >
              Lets Connect
            </button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BasicExample;
