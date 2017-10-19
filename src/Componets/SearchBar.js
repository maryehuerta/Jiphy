import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);
		let timer = null
    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={e => this.onInputChange(e.target.value)}/>
					
      </div>
    );
  }

  onInputChange(term) {
		this.setState({term});
		this.timer = setTimeout(() => {
			console.log(this.state.term)
			this.props.callSearch(this.state.term)
		}, 1500);
    // this.props.onSearchedTermChange(term);
  }
}

export default SearchBar;