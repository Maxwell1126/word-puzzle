import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <h1>Word Puzzle</h1>
                <button>Play</button>
            </div>
        );

    }


}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Home);