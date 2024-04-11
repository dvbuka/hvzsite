import './bootstrap.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './pages/About';
import Account from './pages/Account.js';
import Admin from './pages/Admin';
import { Container } from 'react-bootstrap';
import DNC from './pages/DNC';
import Footer from './components/Footer';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import MyNavbar from './components/Navbar.js';
import Page404 from './pages/404.js';
import Participate from './pages/Participate';
import Profile from './pages/Profile';
import Report from './pages/Report';

function App() {
  function gen_auth_link(redirect_tail) {
    return `https://discord.com/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}${redirect_tail}&scope=identify`
  }

  return (
    <>
      <Router>
        <MyNavbar />
        <Container style={{ padding: '10px' }}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/account' element={<Account discordAuth={gen_auth_link("account")} />} />
            <Route path='/admin' element={<Admin discordAuth={gen_auth_link("admin")} />} />
            <Route path='/dnc' element={<DNC />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/participate' element={<Participate />} />
            <Route path='/profile/:user' element={<Profile />} />
            <Route path='/report' element={<Report discordAuth={gen_auth_link("report")} />} />
            <Route path='/404' element={<Page404 />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
