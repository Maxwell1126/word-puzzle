import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
class Keyboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div></div>
        );

    }

}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Keyboard);