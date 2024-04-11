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

function App() {
  let client_id=process.env.REACT_APP_CLIENT_ID
  let redirect_head=process.env.REACT_APP_REDIRECT_URI
  function gen_auth_link(redirect_tail) {
    return `https://discord.com/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_head}${redirect_tail}&scope=identify`
  }

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
            <Route path='/report' element={<Report discordAuth={gen_auth_link("report")} />} />
            <Route path='/account' element={<Account discordAuth={gen_auth_link("account")} />} />
            <Route path='/profile/:user' element={<Profile />} />
            <Route path='/dnc' element={<DNC />} />
            <Route path='/admin' element={<Admin discordAuth={gen_auth_link("admin")} />} />
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
