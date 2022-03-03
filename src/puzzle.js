import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;

function Puzzle(){
    // const initialGuess = {guess:""};
    // const initalGuesses = {guesses:[]};
    // const [state, dispatch] = useReducer(buildGuess, initialGuess);
    // const [state, dispatch] = useReducer(setGuesses, initalGuesses);
    let [guesses, setGuesses] = useState([]);
    let currentGuesses = useSelector((state => state.setGuesses));
    useEffect (() => {setGuesses(guesses = currentGuesses)});


    let [guess, setGuess ] = useState("");
    let guessToSend = useSelector((state => state.buildGuess));
    useEffect (() => {
        setGuess(guess = guessToSend)
    })


    const dispatch = useDispatch();
    function callGuess(){
        console.log("dispatching post guess")
        if(currentGuesses.length < 6){
        dispatch({
            type: 'POST_GUESS',
            payload: guess,
        })
    }
    }
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
                let sendLetter = async () => { dispatch({
                    type: 'BUILD_GUESS',
                    payload: event.key,
                }) }
                sendLetter().then(document.getElementById(document.activeElement.id).value = event.key, assignFocus(event.key));
            }
        }
        else if (event.code == "Backspace"){
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 0 && 
                    document.getElementById(document.activeElement.id).value == ""){
                event.preventDefault();
            }
            else{
              let deleteLetter = async () => {dispatch({
                    type: 'DELETE_LETTER',
                }) };
                deleteLetter().then(assignFocus(event.code));
   
            }
        }
        else if (event.code == "Enter"){
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 4 &&
                document.getElementById(document.activeElement.id).value != "") {
                assignClassName();
                callGuess();
                renderGuess();
            } else {
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
    // function sendChangeToGuess(code){
    //     if(code != "Backspace"){
    //         dispatch({
    //             type: 'BUILD_GUESS',
    //             payload: code,
    //         })
    //     }else{
    //         dispatch({
    //             type: 'DELETE_LETTER',
    //         })
    //     }
        
    // }
    function assignFocus(code){
        let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
        let currentColumn = parseInt(document.getElementById(document.activeElement.id).id.charAt(2));   
        console.log("guess ", guesses)
        
            if (code != "Backspace") {
                console.log("current row ", document.getElementById(document.activeElement.id).id);
                console.log("value ", document.getElementById(document.activeElement.id).value);
                if (document.getElementById(currentRow + ',' + currentColumn).value == "") {  
                    document.getElementById(currentRow + ',' + (currentColumn)).focus();
                    console.log("hell0 ")
                } else if (document.getElementById(currentRow + ',' + currentColumn).value && currentColumn != 4){
                    console.log("hey")
                    console.log("current row ", document.getElementById(currentRow + ',' + currentColumn));
                    document.getElementById(currentRow + ',' + currentColumn).blur();
                    document.getElementById(currentRow + ',' + (currentColumn+1)).focus();
                    console.log("current row ", document.getElementById(document.activeElement.id).id);
                }
                   
            } 
            else if (code == "Backspace"){
                    if (document.getElementById(currentRow + ',' + currentColumn).value == "") {
                        document.getElementById(currentRow + ',' + (currentColumn-1)).value = "";
                        document.getElementById(currentRow + ',' + currentColumn).blur();
                        document.getElementById(currentRow + ',' + (currentColumn - 1)).focus();
                    }
                    else if (document.getElementById(currentRow + ',' + currentColumn).value != ""){
                        document.getElementById(currentRow + ',' + currentColumn).value = "";
                        document.getElementById(currentRow + ',' + currentColumn).focus();
                    }
                }
                renderGuess();
        } 
    
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
        for (let i = 0; i < guesses.length; i++) {
            for(let n =0; n < 5; n++){
                document.getElementById(i + ',' + n).value = guesses[i].charAt(n);
            }
       
            if(i < 5 && i == guesses.length-1){
                document.getElementById((i +1 ) + ',0').focus();
            }else if(i==5 && i == guesses.length-1){

            }
        }
        for(let i =0; i < guess.length; i ++){
            let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
            if(currentRow < 5){
                document.getElementById(currentRow + ',' + i).value = guess.charAt(i);
            }
        }
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