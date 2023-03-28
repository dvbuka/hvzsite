import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import hvzlogo from '../hvzlogo.png';

function MyNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={hvzlogo}
                            height="30"
                            className="d-inline-block align-center"
                        />{' '}
                        Davis HvZ
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/about">What is Hvz?</Nav.Link>
                        <Nav.Link href="/participate">Participate</Nav.Link>
                        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/report">Report an Infection</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href="/dnc" align="right">Davis Nerf Club</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default MyNavbar;