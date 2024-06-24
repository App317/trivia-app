import { Container, Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/react.svg';

const BasicExample = () => {
  return (
    <Navbar>
      <Container>
        <Nav>
          <div className="social-icon">
            <a href="" target="_blank" rel="noreferrer">
              <img src={logo} alt="" />
            </a>
          </div>
          <Nav.Link href="/" className="navbar-link">
            Home
          </Nav.Link>
          <Nav.Link
            href="https://anthonymb-portfolio.netlify.app/"
            target="_blank"
            className="navbar-link"
          >
            Portfolio
          </Nav.Link>
          <Nav.Link
            href="https://www.linkedin.com/in/anthony-muniz-bueno-644648215/"
            target="_blank"
            className="navbar-link"
          >
            LinkedIn
          </Nav.Link>
          <Nav.Link className="navbar-text">
            <button
              onClick={() =>
                (window.location.href = 'mailto:anthony.munizbueno@gmail.com')
              }
            >
              Email Me
            </button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BasicExample;
