import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;
// import axios from 'axios';


function Puzzle(){
    const dispatchAction = useDispatch();

    useEffect(() => {
        dispatchAction({
            type: 'GET_GUESSES',
        })
    }, [])
    // let [firstGuess, setFirstGuess] = useState("");
    // let getFirstGuess = useSelector((state => state.setFirstGuess.guess));
    //     console.log('first guess', getFirstGuess)
    // const theFirstGuess = useRef(firstGuess)
    // console.log(theFirstGuess.current)
    // let [secondGuess, setSecondGuess] = useState("");
    // let getSecondGuess = useSelector((state => state.setSecondGuess.guess));
    // useEffect(() => { setSecondGuess(secondGuess = getSecondGuess) });

    // let [thirdGuess, setThirdGuess] = useState("");
    // let getThirdGuess = useSelector((state => state.setThirdGuess.guess));
    // useEffect(() => { setThirdGuess(thirdGuess = getThirdGuess) });

    // let [fourthGuess, setFourthGuess] = useState("");
    // let getFourthGuess = useSelector((state => state.setFourthGuess.guess));
    // useEffect(() => { setFourthGuess(fourthGuess = getFourthGuess) });

    // let [fifthGuess, setFifthGuess] = useState("");
    // let getFifthGuess = useSelector((state => state.setFifthGuess.guess));
    // useEffect(() => { setFifthGuess(fifthGuess = getFifthGuess) });

    // let [sixthGuess, setSixthGuess] = useState("");
    // let getSixthGuess = useSelector((state => state.setSixthGuess.guess));
    // useEffect(() => { setSixthGuess(sixthGuess = getSixthGuess) });
    let guessesList = useRef([]);
    let [guesses, setGuesses] = useState([]);
    let currentGuesses = useSelector((state => state.setGuesses));
    console.log(setGuesses.state)
    guessesList.current = [currentGuesses.a, currentGuesses.b, currentGuesses.c, currentGuesses.d, currentGuesses.e, currentGuesses.f]
    useEffect(() => { setGuesses(guesses = guessesList.current) }, [currentGuesses]);


    let [guess, setGuess] = useState("");
    let guessToSend = useSelector((state => state.buildGuess));
    useEffect (() => {  
        setGuess(guess = guessToSend)
    })
    
 
    // let guessesList = useRef([]);
    // let getGuessesList = async () => {
    //     axios({
    //         method: 'GET',
    //         url: '/guess'
    //     }).then((response) => {
    //         guessesList.current = response.data;
    //         console.log('response ',response.data)
    //     }).catch((error) => {
    //         console.log('error in get', error);
    //     })
    // }
    // useEffect(() => { getGuessesList().then(setGuesses(guesses = guessesList.current))});
    // useEffect(() => {  });
    // console.log('guessList ', guessesList.current)
    
    
    // if(secondGuess.length ==0){
    //     dispatchAction({
    //         type: 'GET_SECOND_GUESS',
    //     })
    // }
    // if(thirdGuess.length==0){
    //     dispatchAction({
    //         type: 'GET_THIRD_GUESS',
    //     })
    // }
    // if(fourthGuess.length==0){
    //     dispatchAction({
    //         type: 'GET_FOURTH_GUESS',
    //     })
    // }
    // if(fifthGuess.length == 0){
    //     dispatchAction({
    //         type: 'GET_FIFTH_GUESS',
    //     })
    // }
    // if(sixthGuess.length==0){
    //     dispatchAction({
    //         type: 'GET_SIXTH_GUESS',
    //     })
    // }
    
    const firstInput = useRef(null);
    useEffect(() => {
        firstInput.current.focus();
    }, []);

    useEffect(() => {
        window.addEventListener('keyup', (event) => {
            event.preventDefault();
        });
        }, []);
 
    useEffect(() => {
    function userKeyDown(event){
        
        if (event.code.charAt(0) != 'K' && event.code != "Backspace" && event.code != "Enter") {
                    event.preventDefault();
                }
        else if (event.code.charAt(0) == 'K'){
            if (document.getElementById(document.activeElement.id).value != ""){
                event.preventDefault();
            }else{
                
                dispatchAction({
                    type: 'BUILD_GUESS',
                    payload: event.key,
                }) 
               
            }
        }
        else if (event.code == "Backspace"){
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 0 && 
                    document.getElementById(document.activeElement.id).value == ""){
                event.preventDefault();
            }
            else{
                dispatchAction({
                    type: 'DELETE_LETTER',
                })
             
            }
        }
        else if (event.code == "Enter"){
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 4 &&
                document.getElementById(document.activeElement.id).value != ""){
                let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
                let finalGuess = "";
                for (let i = 0; i < 5; i++) {
                    finalGuess = finalGuess + document.getElementById(currentRow + ',' + i).value
                }
                let sendGuess= async () => dispatchAction({
                    type: 'POST_GUESS',
                    payload: {guess: finalGuess, id:(currentRow+1)}
                })
                sendGuess()
                dispatchAction({
                    type: 'CLEAR_GUESS',
                })

            }
           else{
                event.preventDefault();
           }
        } 
}
        document.addEventListener('keydown', userKeyDown)
        return function cleanupListener() {
           document.removeEventListener('keydown', userKeyDown)
        }
    }, []);

    

    window.onmousedown = (event) => {
        if (event.target.className != "keyboardButton" || "delEnterButton"){
            event.preventDefault();
        }
    }
    window.onmouseup = (event) => {
        if (event.target.className != "keyboardButton" || "delEnterButton") {
            event.preventDefault();
        }
    }

    function assignClassName(){
        console.log("hello")
    }    
        let rowDiv=[];
  

    // function assignFocus(code){
    //     let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
    //     let currentColumn = parseInt(document.getElementById(document.activeElement.id).id.charAt(2));   
    //     console.log("guess ", guesses)
    //     renderGuess();
            // if (code != "Backspace") {
            //     console.log("current row ", document.getElementById(document.activeElement.id).id);
            //     console.log("value ", document.getElementById(document.activeElement.id).value);
            //     document.getElementById(document.activeElement.id).value = code
            //     if (document.getElementById(currentRow + ',' + currentColumn).value == "") {  
            //         document.getElementById(currentRow + ',' + (currentColumn)).focus();
            //         console.log("hell0 ")
            //     } else if (document.getElementById(currentRow + ',' + currentColumn).value && currentColumn != 4){
            //         console.log("hey")
            //         console.log("current row ", document.getElementById(currentRow + ',' + currentColumn));
            //         document.getElementById(currentRow + ',' + currentColumn).blur();
            //         document.getElementById(currentRow + ',' + (currentColumn+1)).focus();
            //         console.log("current row ", document.getElementById(document.activeElement.id).value);
            //     }
                   
            // } 
            // else if (code == "Backspace"){
            //     console.log("current row ", document.getElementById(currentRow + ',' + currentColumn))
            //         if (document.getElementById(currentRow + ',' + currentColumn).value == "") {
            //             console.log("current row ", document.getElementById(currentRow + ',' + (currentColumn )))
            //             document.getElementById(currentRow + ',' + (currentColumn-1)).value = "";
            //             document.getElementById(currentRow + ',' + currentColumn).blur();
            //             document.getElementById(currentRow + ',' + (currentColumn - 1)).focus();
            //             console.log("current row ", document.getElementById(currentRow + ',' + currentColumn))
            //         }
            //         else if (document.getElementById(currentRow + ',' + currentColumn).value != ""){
            //             console.log("current row ", document.getElementById(currentRow + ',' + currentColumn))
            //             document.getElementById(currentRow + ',' + currentColumn).value = "";
            //             document.getElementById(currentRow + ',' + currentColumn).focus();
            //             console.log("current row ", document.getElementById(currentRow + ',' + currentColumn))
            //         }
            //     }
                
        // } 
    
        let puzzleDiv="";
        for(let i=0; i<6; i++){
            let colDiv=[];
                for(let n=0; n<5; n++){
                    if(i==0 && n == 0){
                        colDiv.push(<input ref={firstInput} type="text" value="" autoFocus="" readOnly="readonly" id={i + `,` + n} 
                            className={"input"} maxLength={1} rows={1} cols={1}/>);
                    }else if(n == 4){
                        colDiv.push(<input type="text" value="" readOnly="readonly" id={i + `,` + n} 
                            className={"inputLast"} maxLength={1} rows={1} cols={1}/>);
                        rowDiv.push(<div className={"rowContainer"} id={i}>{colDiv}</div>);
                    }else{
                        colDiv.push(<input type="text" value="" readOnly="readonly" id={i + `,` + n} 
                            className={"input"} maxLength={1} rows={1} cols={1}/>);
                    }
                }
            puzzleDiv = <div className={"puzzleContainer"}><h1>Word Puzzle</h1>{rowDiv}</div>;
            }
            
    function renderGuess () {
        let guessesArray = [];
        for (let i = 0; i < guesses.length; i++){
            console.log('guess ', i, ' ', guesses[i].length)
            if (guesses[i].length >0){
                guessesArray.push(guesses[i]);
            }
        }

        console.log(guesses)
        for (let i = 0; i < guessesArray.length; i++) {
            for(let n =0; n < 5; n++){
                document.getElementById(i + ',' + n).value = guessesArray[i].charAt(n);
            }
            if (guessesArray.length == 0) {
                document.getElementById('0,0').focus();
            }
            else if (i == guessesArray.length-1 && guessesArray.length != 6){
                document.getElementById((i +1 ) + ',0').focus();
            } 
            console.log(document.getElementById(document.activeElement.id))
        }
        console.log(guess);
        for(let i =0; i < guess.length; i ++){
            let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
            console.log(currentRow)
            if (guessesArray.length != 6){
                document.getElementById(currentRow + ',' + i).value = guess.charAt(i);
                console.log('i ', i, 'length ',guess.length)
                if (guess.length && i < (guess.length ) && guess.length < 5){
                    console.log('here')
                    document.getElementById(currentRow + ',' + (i+1)).focus();
                } else if (guess.length && i == (guess.length - 1) && guess.length == 5){
                    document.getElementById(currentRow + ',' + i).focus();
                    console.log('there')
                }
            }
            console.log(document.getElementById(document.activeElement.id))
        }
       
        console.log(document.getElementById(document.activeElement.id))
    }  

    useEffect(()=> {
        renderGuess();
    })
  return (
        
            <div className="container">
                {puzzleDiv}
                <Keyboard />
            </div>
        );

}

export default (Puzzle);