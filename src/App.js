import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Componets/SearchBar'

class App extends Component {

 
  // Make a function that calls the Giphy API
  // Pass it as props to SearchBar, and return the JSON from the fetch
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SearchBar/>
      </div>
    );
  }
}

export default App;
