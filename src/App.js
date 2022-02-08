import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Home from './home.js';


class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore
});
export default connect(mapStateToProps)(App);
