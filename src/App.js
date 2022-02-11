import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home.js';
import Puzzle from './puzzle.js';


class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      

        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/puzzle' element={<Puzzle />} />
            <Route render={() => <h1>404</h1>} />
          </Routes>
        </BrowserRouter>
    
     
    );
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore
});
export default connect(mapStateToProps)(App);
