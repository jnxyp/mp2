import React from 'react';
import logo from './logo.svg';
import './App.css';

const apiKey = process.env.REACT_APP_TMDB_APIKEY;
const token = process.env.REACT_APP_TMDB_API_TOKEN;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <p>TMDB API Key: {apiKey}</p>
          <p>TMDB Token: {token}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
