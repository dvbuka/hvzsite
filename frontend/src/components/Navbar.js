import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/nobg.png';
function MyNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        height="30"
                        className="d-inline-block align-center"
                    />{' '}
                    Davis HvZ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/about">What is HvZ?</Nav.Link>
                        <Nav.Link href="/participate">Participate</Nav.Link>
                        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/report">Report an Infection</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                        <Nav.Link href="/dnc" align="right">Davis Nerf Club</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;