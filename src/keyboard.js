import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './keyboard.css';

function Keyboard() {
    const dispatchAction = useDispatch();
    
    useEffect(() => {
        dispatchAction({
            type: 'GET_GUESSES',
        })
    }, [])
    useEffect(() => {
        dispatchAction({
            type: 'GET_WORD',
        })
    }, [])

    let guessesList = useRef([]);
    let [guesses, setGuesses] = useState([]);
    let currentGuesses = useSelector((state => state.setGuesses));
    guessesList.current = [currentGuesses.a, currentGuesses.b, currentGuesses.c, currentGuesses.d, currentGuesses.e, currentGuesses.f]
    useEffect(() => { setGuesses(guesses = guessesList.current) }, [currentGuesses]);

    let [word, setWord] = useState("");
    let wordToGuess = useSelector((state => state.setWordToGuess.toLowerCase()));
    useEffect(() => {
        setWord(word = wordToGuess)
    })

    let guessesArray = [];
    for (let i = 0; i < guesses.length; i++) {

        if (guesses[i].length > 0) {
            guessesArray.push(guesses[i]);
        }
    }

       let letterButton = (event) => {
           if (guesses[5].length > 0 || guesses[0] == word || guesses[1] == word || guesses[2] == word || guesses[3] == word || guesses[4] == word){
           }
          else if (document.getElementById(document.activeElement.id).value == "") {
               dispatchAction({
                   type: 'BUILD_GUESS',
                   payload: event.target.id,
               }) 
           }
           console.log(event.target.id);
        } 
        let deleteButton = (event) => {
            if (guesses[5].length > 0 || guesses[0] == word || guesses[1] == word || guesses[2] == word || guesses[3] == word || guesses[4] == word
            || (document.getElementById(document.activeElement.id).id.charAt(2) == 0 &&
                document.getElementById(document.activeElement.id).value == "")){
            }
            else {
                dispatchAction({
                    type: 'DELETE_LETTER',
                })

            }
        }
        let enterButton = (event) => {
            if (guesses[5].length > 0 || guesses[0] == word || guesses[1] == word || guesses[2] == word || guesses[3] == word || guesses[4] == word
                || (document.getElementById(document.activeElement.id).id.charAt(2) == 4 &&
                document.getElementById(document.activeElement.id).value != "")) {
                let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
                let finalGuess = "";
                for (let i = 0; i < 5; i++) {
                    finalGuess = finalGuess + document.getElementById(currentRow + ',' + i).value
                }
                let sendGuess = async () => dispatchAction({
                    type: 'POST_GUESS',
                    payload: { guess: finalGuess.toLowerCase(), id: (currentRow + 1) }
                })
                sendGuess()

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
                topRow.push(<button onClick={letterButton} disabled="" id={firstRowArray[i]} className="keyboardButton">{firstRowArray[i]}</button>);
            }
            for (let i = 0; i < secondRowArray.length; i++) {
                middleRow.push(<button onClick={letterButton} disabled="" id={secondRowArray[i]} className="keyboardButton">{secondRowArray[i]}</button>);
            }
            for (let i = 0; i < thirdRowArray.length; i++) {
                bottomRow.push(<button onClick={letterButton} disabled="" id={thirdRowArray[i]} className="keyboardButton">{thirdRowArray[i]}</button>);
            }
        }
        createRow(topRowArray, middleRowArray, bottomRowArray);

    if (guessesArray.length > 0) {
        if (document.getElementById(`${guessesArray.length - 1},0`).className == "correctRecent" ||
            document.getElementById(`${guessesArray.length - 1},0`).className == "misplacedRecent" ||
            document.getElementById(`${guessesArray.length - 1},0`).className == "wrongRecent") {
            for(let i = 0; i < topRowArray.length; i ++){
                document.getElementById(`${topRowArray[i]}`).disabled="disabled";
            }
            for (let i = 0; i < middleRowArray.length; i++) {
                document.getElementById(`${middleRowArray[i]}`).disabled = "disabled";
            }
            for (let i = 0; i < bottomRowArray.length; i++) {
                document.getElementById(`${bottomRowArray[i]}`).disabled = "disabled";
            }
            document.getElementById("enter").disabled="disabled";
            document.getElementById("delete").disabled = "disabled";

            setTimeout(() => {
                for (let i = 0; i < topRowArray.length; i++) {
                    document.getElementById(`${topRowArray[i]}`).disabled = "";
                }
                for (let i = 0; i < middleRowArray.length; i++) {
                    document.getElementById(`${middleRowArray[i]}`).disabled = "";
                }
                for (let i = 0; i < bottomRowArray.length; i++) {
                    document.getElementById(`${bottomRowArray[i]}`).disabled = "";
                }
                document.getElementById("enter").disabled = "";
                document.getElementById("delete").disabled = "";
            }, 6000);

        }
    }
        return(
            <div className="keyboard">
      
                <div className="row">{topRow}</div><br></br>
                <div className="row">{middleRow}</div><br></br>
                <div className="row"><button onClick={deleteButton} disabled="" id="delete" className="delEnterButton">DEL</button>{bottomRow}
                    <button onClick={enterButton} disabled="" id="enter" className="delEnterButton">ENT</button></div>
            </div>
        );

    }



export default Keyboard;