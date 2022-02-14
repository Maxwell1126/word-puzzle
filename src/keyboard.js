import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
class Keyboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let topRowArray = ['Q','W','E','R','T','Y','U','I','O','P'];
        let middleRowArray = ['A','S','D','F','G','H','J','K','L'];
        let bottomRowArray = ['Z','X','C','V','B','N','M'];
        let topRow =[];
        let middleRow =[];
        let bottomRow = [];

        function createRow(firstRowArray, secondRowArray, thirdRowArray) {
            for(let i =0; i < firstRowArray.length; i++){   
                topRow.push(<button id={firstRowArray[i]}>{firstRowArray[i]}</button>);
            }
            for (let i = 0; i < secondRowArray.length; i++) {
                middleRow.push(<button id={secondRowArray[i]}>{secondRowArray[i]}</button>);
            }
            for (let i = 0; i < thirdRowArray.length; i++) {
                bottomRow.push(<button id={thirdRowArray[i]}>{thirdRowArray[i]}</button>);
            }
        }
        createRow(topRowArray, middleRowArray, bottomRowArray);
        return(
            <div id="keyboard">
                <div>{topRow}</div>
                <div>{middleRow}</div>
                <div><button>Delete</button>{bottomRow}<button>Enter</button></div>
            </div>
        );

    }

}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Keyboard);