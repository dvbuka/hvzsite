import './bootstrap.css';
import './App.css';
import MyNavbar from './components/Navbar.js';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Participate from './pages/Participate';
import Leaderboard from './pages/Leaderboard';
import Report from './pages/Report';
import DNC from './pages/DNC';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <MyNavbar />
        <Container style={{padding:'10px'}}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/participate' element={<Participate />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/report' element={<Report />} />
            <Route path='/dnc' element={<DNC />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
