// Because react is 
import React, { Component } from 'react';
import './App.css';
import SearchBar from './Componets/SearchBar'

class App extends Component {

  constructor(props) {
    super(props);
    // We want to have state because we are dealing with 
    // a changing data based on a serch term

    //This is our inital state
    this.state = { 
      giphs: null,
      selectedgiph: null,
      loading: true
    };
  }
  
// We want dog to be the defult search so Before the componet renders 
  componentWillMount () {
    //We are calling a function giphySearch (line 24) with a default term of dog *
    this.giphySearch('dog')
  }
  
  // GiphySearch is a function that takes an term 
  //Using the giphy API fetch gifs and put it into the state
  giphySearch = (term) => {
  
    //We are getting the data from Giphy's API endpoint
    // Fetch is a built in interface in Javascript that is able to perform GET/POST/PUT/DELETE
    // async requests in order to retrieve data from the internet
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=pfYmLUYFExpno5nQ5kOSv364ydnMHxrJ&q=${term}&limit=25&offset=0&rating=G&lang=en`)
    // Fetch turns a Promise
    // The Promise object represents the eventual completion (or failure) 
    //of an asynchronous operation, and its resulting value.
    // We turn the response we get back into JSON
    .then(res => res.json())
    // Then set the data key in the response in our local state
    .then(res => {this.setState({giphs: res.data})})
    // Console log so you can see the data
    .then(res => console.log(this.state.giphs))
    // If a requests fails, we bail out by using catch
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
