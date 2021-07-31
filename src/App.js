import React, { Component} from 'react';
import './App.css';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchText: '',
  };
  onSubmit = searchText => {
    this.setState({ searchText });
  };
  render() {
     return (
      <div className="App">
         <Searchbar onSubmit={this.onSubmit} />
         <ToastContainer
           autoClose={3000}
           position="top-center"
          />
         <ImageGallery searchText={this.state.searchText} />
      </div>
  );
  };
}

export default App;
