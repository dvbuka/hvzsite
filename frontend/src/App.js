import './bootstrap.css';
import MyNavbar from './components/Navbar.js';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Participate from './pages/Participate';
import Leaderboard from './pages/Leaderboard';
import Report from './pages/Report';
import DNC from './pages/DNC';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Account from './pages/Account.js';
import Page404 from './pages/404.js';

let discordAuthReport = "https://discord.com/api/oauth2/authorize?client_id=1130626687357431849&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Freport&scope=identify"
let discordAuthAdmin = "https://discord.com/api/oauth2/authorize?client_id=1130626687357431849&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin&scope=identify"
let discordAuthAccount = "https://discord.com/api/oauth2/authorize?client_id=1130626687357431849&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Faccount&scope=identify"

function App() {
  return (
    <>
      <Router>
        <MyNavbar />
        <Container style={{ padding: '10px' }}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/participate' element={<Participate />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/report' element={<Report discordAuth={discordAuthReport} />} />
            <Route path='/account' element={<Account discordAuth={discordAuthAccount} />} />
            <Route path='/profile/:user' element={<Profile />} />
            <Route path='/dnc' element={<DNC />} />
            <Route path='/admin' element={<Admin discordAuth={discordAuthAdmin} />} />
            <Route path='/404' element={<Page404 />} />
            <Route
              path="*"
              element={<Navigate to="/404" />}
            />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
