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
      selectedgiph: null
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
    const {loading} = this.state
    // We set our loading state to true, which will change what is rendered in our render function
    // We also set our giphs state to null to prevent flashing
    this.setState({loading: true, giphs: null})
    // We slow down user input by 1500 ms to prevent every keystroke from calling the API
    setTimeout(() => {
    // We need to get the data from Giphy's API endpoint
    // Fetch is a built in interface in Javascript that is able to perform GET/POST/PUT/DELETE
    // async requests in order to retrieve data from the internet
    // by default, this is a GET request
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=pfYmLUYFExpno5nQ5kOSv364ydnMHxrJ&q=${term}&limit=25&offset=0&rating=G&lang=en`)
    // Fetch turns a Promise
    // The Promise object represents the eventual completion (or failure) 
    //of an asynchronous operation, and its resulting value.

    // We turn the response we get back into JSON
    .then(res => res.json())
    // Then set the data key in the response in our local state, and now that we have gifs, we can set loading back to false
    .then(res => {this.setState({giphs: res.data, loading: false})})
    // Console log so you can see the data
    .then(res => console.log(this.state.giphs))
    // If a requests fails, we bail out by using catch
    .catch(err => console.error("Something went wrong: " + err))
    }, 1500);
  }

  
  // Make a function that calls the Giphy API
  // Pass it as props to SearchBar, and return the JSON from the fetch
  render() {

    // To simplify the code (so we don't have to write this.state) we can destructure 
    // the giphs array. So Instead of having to writing "this.state.giphs" when we want 
    // to use the array of giphy we can now use "giphs".
    const {giphs, loading} = this.state
   
    // Definition of map function: "the map method creates a new array with the results 
    // of calling a provided function on every element in the array." 
    // We call the map function and for each element (gif) in the array we return a 
    // video of the gif and put it into a new array called gifs
    let gifs = giphs && giphs.map( (gif, key ) => {
      console.log(gif)
      return (
        <video className= "Video" height={gif.images.fixed_height.height} autoPlay loop  key={gif.id}>
          <source src={gif.images.fixed_height.mp4} type="video/mp4" />
        </video>
      );
    });

    
    return (
      <div className="App" style={{minHeight: window.innerHeight}}>
        <SearchBar callSearch={ this.giphySearch } />
        {/* This is a ternary statement! */}
        {/* if NOT loading, then we show our gifs */}
        {/* else, we show our "loading" indicator */}
        {!loading ? (
          // the parenthesis above are known as an inline return, which eliminates having multiple return statements
        <div>
            <div className="Video-list">
              {gifs}
            </div> 
         </div>
      ) : // <-- else
        (<div>
          <Loading />
        </div>)}
      </div>
    );
  }
}

// You typically don't want to have multiple components in on file, but you can... but should you?
class Loading extends Component{
  render(){
    return(
      <div>
        <img src={"https://media.giphy.com/media/8AR5wSF7ynLuU/giphy.gif"}/>
        <p>Loading ...</p>
      </div>
    )
  }
}



export default App;
