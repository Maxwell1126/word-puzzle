import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate} from 'react-router-dom';




function Home(){
let navigate = useNavigate();
const playButton = (event) => {
    navigate('/puzzle');
}        

        return (
            <div>
                <button onClick={playButton}>Play</button>
            </div>
        );
    }


const mapStateToProps = reduxStore => ({
    reduxStore: reduxStore
});

export default connect(mapStateToProps)(Home);