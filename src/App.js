import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Componets/SearchBar'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      giphy: null
    }
  }

  // Make a function that calls the Giphy API
  // Pass it as props to SearchBar, and return the JSON from the fetch
  searchForGiphs = (query) => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=zUIAl9Gi343hKtaeahFUGIPQlAVXIiPZ&q=${query}&limit=25&offset=0&rating=G&lang=en`)
    .then(res => res.json())
    .then(res => this.setState({giphy: res.data}))
    .then(console.log(this.state.giphy))    
    .catch(err => console.error("Something bad happend: " + err))
  }

  render() {
    const {giphy} = this.state
    return (
      <div className="App">
        <SearchBar search={this.searchForGiphs}/>
        {
          giphy && giphy.map((giphy) => (
            <video key={giphy.id} autoPlay loop width={giphy.images.preview.width} height={giphy.images.preview.height}>
              <source src={giphy.images.preview.mp4} type="video/mp4"/>
            </video>
          ))
        }
      </div>  
    );
  }
}

export default App;
