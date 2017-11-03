import React, { Component } from 'react';
import './App.css';
import SearchBar from './Componets/SearchBar'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      giphs: null,
      selectedgiph: null 
    };
  }
  

  componentWillMount () {
    this.giphySearch('dog')
  }

  //Using the giphy API fetch gifs and put it into the state
  giphySearch = (term) => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=pfYmLUYFExpno5nQ5kOSv364ydnMHxrJ&q=${term}&limit=25&offset=0&rating=G&lang=en`)
    .then(res => res.json())
    .then(res => {this.setState({giphs: res.data})})
    .then(res => console.log(this.state.giphs))
    .catch(err => console.error("Something went wrong: " + err))
  }

  
  // Make a function that calls the Giphy API
  // Pass it as props to SearchBar, and return the JSON from the fetch
  render() {
    const {giphs} = this.state
    let gifs = giphs && giphs.map( (gif, key ) => {
      return (
        <video className= "Video" height={gif.images.fixed_height.height} autoPlay loop  key={gif.id}>
          <source src={gif.images.fixed_height.mp4} type="video/mp4" />
        </video>
      );
    });

    return (
      <div className="App">
        <SearchBar callSearch = { this.giphySearch } />
        <div className="Video-list">
          {gifs}
        </div>
      </div>
    );
  }
}



export default App;
