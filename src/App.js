import './style/App.css';

import { Routes, Route } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom' // Debug

import User from './pages/User'
import Search from './pages/Search'

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/github-finder" element={<Search/>} />
          <Route path="/github-finder/user/:username" element={<User/>} />
            
        </Routes>
      </main>
    </>
  );
}

export default App;
