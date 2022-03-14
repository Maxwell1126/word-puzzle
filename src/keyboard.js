import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'

function Keyboard() {
 const dispatchAction = useDispatch();
          
       let letterButton = (event) => {
           if (document.getElementById(document.activeElement.id).value == "") {
               dispatchAction({
                   type: 'BUILD_GUESS',
                   payload: event.target.id,
               }) 
           }
           console.log(event.target.id);
        } 
        let deleteButton = (event) => {
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 0 &&
                document.getElementById(document.activeElement.id).value == "") {

            }
            else {
                dispatchAction({
                    type: 'DELETE_LETTER',
                })

            }
        }
        let enterButton = (event) => {
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 4 &&
                document.getElementById(document.activeElement.id).value != "") {
                let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
                let finalGuess = "";
                for (let i = 0; i < 5; i++) {
                    finalGuess = finalGuess + document.getElementById(currentRow + ',' + i).value
                }
                let sendGuess = async () => dispatchAction({
                    type: 'POST_GUESS',
                    payload: { guess: finalGuess, id: (currentRow + 1) }
                })
                sendGuess()
                dispatchAction({
                    type: 'CLEAR_GUESS',
                })

            }
        }
        let topRowArray = ['Q','W','E','R','T','Y','U','I','O','P'];
        let middleRowArray = ['A','S','D','F','G','H','J','K','L'];
        let bottomRowArray = ['Z','X','C','V','B','N','M'];
        let topRow =[];
        let middleRow =[];
        let bottomRow = [];
      
        function createRow(firstRowArray, secondRowArray, thirdRowArray) {
            for(let i =0; i < firstRowArray.length; i++){   
                topRow.push(<button onClick={letterButton} id={firstRowArray[i]} className="keyboardButton">{firstRowArray[i]}</button>);
            }
            for (let i = 0; i < secondRowArray.length; i++) {
                middleRow.push(<button onClick={letterButton} id={secondRowArray[i]} className="keyboardButton">{secondRowArray[i]}</button>);
            }
            for (let i = 0; i < thirdRowArray.length; i++) {
                bottomRow.push(<button onClick={letterButton} id={thirdRowArray[i]} className="keyboardButton">{thirdRowArray[i]}</button>);
            }
        }
        createRow(topRowArray, middleRowArray, bottomRowArray);
        return(
            <div className="keyboard">
                <div className="topRow">{topRow}</div><br></br>
                <div className="middleRow">{middleRow}</div><br></br>
                <div className="bottomRow"><button onClick={deleteButton} className="delEnterButton">DEL</button>{bottomRow}
                    <button onClick={enterButton} className="delEnterButton">ENT</button></div>
            </div>
        );

    }



export default Keyboard;