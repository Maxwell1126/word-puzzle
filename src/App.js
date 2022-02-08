import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './home.js';
import Puzzle from './puzzle.js';


class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore
});
export default connect(mapStateToProps)(App);
