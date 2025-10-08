import React from 'react';
import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router';
import Gallery from './views/Gallery';
import Search from './views/Search';
import Detail from './views/Detail';

function App() {

  const [movieIds, setMovieIds] = React.useState<{ id: number }[]>([]);

  return (
    <BrowserRouter basename='/mp2'>
      <div className="app">
        <div className="app-header">
          <Link to="/" className="app-link"><h1 className="app-title">The React Movie Database</h1></Link>

          <div className="app-nav_links">
            <NavLink to="/" className={({ isActive }) => `app-link ${isActive ? 'active' : ''}`}>Search</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `app-link ${isActive ? 'active' : ''}`}>Gallery</NavLink>
          </div>
        </div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Search setMovieIds={setMovieIds} />} />
            <Route path="/gallery" element={<Gallery setMovieIds={setMovieIds} />} />
            <Route path="/detail/:id" element={<Detail movieIds={movieIds} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
