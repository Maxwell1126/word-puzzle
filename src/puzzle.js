import React, { Component } from 'react';
import { connect } from 'react-redux';

class Puzzle extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <h1>Word Puzzle</h1>
            </div>
        );

    }


}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Puzzle);