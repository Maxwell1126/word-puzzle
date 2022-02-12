import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
class Puzzle extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <h1>Word Puzzle</h1>
                <div><textarea  class={"textarea"} maxLength={1} rows={1} cols={1}></textarea></div>
            </div>
        );

    }


}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Puzzle);