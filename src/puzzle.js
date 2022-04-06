import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;
import './keyboard.css'


function Puzzle(){
    const dispatchAction = useDispatch();
    let isAnimated = false;
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

    let [guess, setGuess] = useState("");
    let guessToSend = useSelector((state => state.buildGuess.guess));
    useEffect (() => {  
        setGuess(guess = guessToSend)
    })
    let [lastKey, setLastKey] = useState("");
    let lastKeyToSend = useSelector((state => state.buildGuess.lastKey));
    useEffect(() => {
        setLastKey(lastKey= lastKeyToSend)
    })

   
    let [word, setWord] = useState("");
    let wordToGuess = useSelector((state => state.setWordToGuess.toLowerCase()));
    useEffect(() => {
        setWord(word= wordToGuess)
    })
    
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
     
        if (guesses[5].length > 0 || guesses[0] == word || guesses[1] == word || guesses[2] == word || guesses[3] == word || guesses[4] == word || isAnimated==true){
            event.preventDefault();
        }else{
        if (event.code.charAt(0) != 'K' && event.code != "Backspace" && event.code != "Enter") {
                    event.preventDefault();
                }
        else if (event.code.charAt(0) == 'K' ){
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

                    // dispatchAction({
                    //     type: 'CLEAR_GUESS',
                    // })
         
                }
           else{
                event.preventDefault();
           }
        } 
    }
}
        document.addEventListener('keydown', userKeyDown)
        return function cleanupListener() {
           document.removeEventListener('keydown', userKeyDown)
        }
    });

    

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
            puzzleDiv = <div className={"puzzleContainer"}><h1>Word Puzzle</h1>{rowDiv}<div id="p" className='pNormal' >Word Not in the Dictionary</div></div>;
            }
    // const animated = document.querySelector('.animated');
    let counter = 0;
    useEffect(() => {
        document.addEventListener('animationend', () => {
        // function aniEnd(event){
            document.getElementById("p").className = "pNormal";
            let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
            for(let i =0; i < 5; i++){
                if (document.getElementById((currentRow) + ',' + i).className == "notWord") {
                    document.getElementById((currentRow) + ',' + i).className = "input";
                 
                } else if (document.getElementById((currentRow) + ',' + i).className == "notWordLast") {
                    document.getElementById((currentRow) + ',' + i).className = "inputLast";
                    document.getElementById("p").className = "pNormal";
                    counter = 0;
              
                }
            }
            
            if (guessesList.current[5].length > 0 || guessesList.current[0].length == 0){
                currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
                
            }else{
                
                currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0) - 1);
            }
            if (counter < 5){

           
            
                if (document.getElementById(currentRow + ',' + counter).className == "correctRecent"){
                    document.getElementById(currentRow + ',' + counter).className = "correct";
                    // if (document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardCorrectRecent" ||
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardMisToCorRecent"){
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className = "keyboardCorrect";
                    // }
                } else if (document.getElementById(currentRow + ',' + counter).className == "misplacedRecent"){
                    document.getElementById(currentRow + ',' + counter).className = "misplaced";
                    // if (document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardMisplacedRecent") {
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className = "keyboardMisplaced";
                    // }
                } else if (document.getElementById(currentRow + ',' + counter).className == "wrongRecent"){
                    document.getElementById(currentRow + ',' + counter).className = "wrong";
                    // if (document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardWrongRecent") {
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className = "keyboardWrong";
                    // }
                } else if (document.getElementById(currentRow + ',' + counter).className == "correctLastRecent") {
                    document.getElementById(currentRow + ',' + counter).className = "correctLast";
                    // if (document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardCorrectRecent" ||
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardMisToCorRecent") {
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className = "keyboardCorrect";
                    // }
                } else if (document.getElementById(currentRow + ',' + counter).className == "misplacedLastRecent") {
                    document.getElementById(currentRow + ',' + counter).className = "misplacedLast";
                    // if (document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardMisplacedRecent") {
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className = "keyboardMisplaced";
                    // }
                } else if (document.getElementById(currentRow + ',' + counter).className == "wrongLastRecent") {
                    document.getElementById(currentRow + ',' + counter).className = "wrongLast";
                    // if (document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className == "keyboardWrongRecent") {
                    //     document.getElementById(document.getElementById(currentRow + ',' + counter).value.toUpperCase()).className = "keyboardWrong";
                    // }
                }
                counter++;
            }else{
                // for (let i = 0; i < 5; i++) {
                //     console.log(document.getElementById(currentRow + ',' + i).className)
                //     console.log(currentRow, ' ', i)
                //     console.log(document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className)
                //     if (document.getElementById(currentRow + ',' + i).className == "correct"
                //         || document.getElementById(currentRow + ',' + i).className == "correctLast"
                //         || document.getElementById(currentRow + ',' + i).className == "correctLastRecent"
                //         || document.getElementById(currentRow + ',' + i).className == "correctRecent") {
                //         if (document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className == "keyboardCorrectRecent" ||
                //             document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className == "keyboardMisToCorRecent") {
                //             setTimeout(()=>{document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className = "keyboardCorrect";}, 1000)
                //         }
                //     } else if (document.getElementById(currentRow + ',' + i).className == "misplacedLast"
                //         || document.getElementById(currentRow + ',' + i).className == "misplaced"
                //         || document.getElementById(currentRow + ',' + i).className == "misplacedLastRecent"
                //         || document.getElementById(currentRow + ',' + i).className == "misplacedRecent"
                //     ) {
                //         if (document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className == "keyboardMisplacedRecent") {
                //             setTimeout(() => { document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className = "keyboardMisplaced"; }, 1000)
                //         }
                //     } else if (document.getElementById(currentRow + ',' + i).className == "wrongLast"
                //         || document.getElementById(currentRow + ',' + i).className == "wrong"
                //         || document.getElementById(currentRow + ',' + i).className == "wrongLastRecent"
                //         || document.getElementById(currentRow + ',' + i).className == "wrongRecent") {
                //         if (document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className == "keyboardWrongRecent") {
                //             setTimeout(() => {  document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className = "keyboardWrong";}, 1000)
                //         }
                //     }
                //     console.log(document.getElementById(document.getElementById(currentRow + ',' + i).value.toUpperCase()).className)
                // }
                // setTimeout(() => { document.onkeydown = () => true;}, 1000);
                counter = 0;
            }  
            if (document.getElementById(currentRow + ',' + '4').className == "correctLast" ||
                document.getElementById(currentRow + ',' + '4').className == "misplacedLast" ||
                document.getElementById(currentRow + ',' + '4').className == "wrongLast" ||
                document.getElementById(currentRow + ',' + '4').className == "inputLast"){
                   
                
                }
  
                
         
            

           
            
            
        });
        // document.addEventListener('animationend', aniEnd)
        // return function cleanupListener() {
        //     document.removeEventListener('animationend', aniEnd)
        // }
    }, []);
       
    function renderGuess () {

        let guessesArray = [];
        for (let i = 0; i < guesses.length; i++){

            if (guesses[i].length >0){
                guessesArray.push(guesses[i]);
            }
        }

        for (let i = 0; i < guessesArray.length; i++) {
            let wordArray = [];
            let guessArray = [];
            
            for(let x =0; x < word.length; x++){
                wordArray.push({id: x, char: word.charAt(x)})
            }
            for (let x = 0; x < guessesArray[i].length; x++) {
                guessArray.push({ id: x, char: guessesArray[i].charAt(x) })
            }

            let tempGuessArray = [];
            let tempWordArray = [];
            for (let n = 0; n < 5; n++) {
                
                document.getElementById(i + ',' + n).value = guessesArray[i].charAt(n);
                if (wordArray[n].char == guessArray[n].char && 
                    wordArray[n].id == guessArray[n].id && guessArray[n].id != 4){
                    if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" 
                        && lastKey == "Enter") {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correctRecent";
                        document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${guessArray[n].id}s`;
                        isAnimated=true;
                        setTimeout(() => {
                            isAnimated = false;
                        }, 6000);
                    } else {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correct";
                    }
                } else if (wordArray[n].char == guessArray[n].char && 
                           wordArray[n].id == guessArray[n].id && guessArray[n].id == 4) {
                    if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" 
                        && lastKey == "Enter") {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correctLastRecent";
                        document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${n}s`;
                        isAnimated = true;
                        setTimeout(() => {
                            isAnimated = false;
                        }, 6000);
                    } else {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correctLast";
                    }     
                }
                else{
                    tempWordArray.push(wordArray[n]);
                    tempGuessArray.push(guessArray[n]);
                }
                if(n == 4){
                    guessArray = tempGuessArray;
                    wordArray = tempWordArray;
                }
            }
            let wordCharCounter = 0;
            let guessCharCounter = 0;
            for(let z = 0; z < wordArray.length; z++){

                for(let y = 0; y < wordArray.length; y++){
                    if(guessArray[z].char == wordArray[y].char){
                        wordCharCounter ++;
                    }
                }

                if(wordCharCounter == 0){
                    if (guessArray[z].id != 4){
                        if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace"
                            && lastKey == "Enter") {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrongRecent";
                            document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id}s`;
                            isAnimated = true;
                            setTimeout(() => {
                                isAnimated = false;
                            }, 6000);
                        } else {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrong";
                        }
                    }else{
                        if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrongLastRecent";
                            document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id}s`;
                            isAnimated = true;
                            setTimeout(() => {
                                isAnimated = false;
                            }, 6000);
                        } else {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrongLast";
                        }
                    }
                    
                } else{
                    for (let y = 0; y < wordArray.length; y++) {
                      
                        if (guessArray[z].char == guessArray[y].char) {
                            guessCharCounter++;
                            if (guessCharCounter <= wordCharCounter) {
                                if (guessArray[y].id != 4) {
                                    if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace"
                                        && lastKey == "Enter") {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplacedRecent";
                                        document.getElementById(i + ',' + guessArray[y].id).style.animationDelay = `${guessArray[y].id}s`;
                                        isAnimated = true;
                                        setTimeout(() => {
                                            isAnimated = false;
                                        }, 6000);
                                    } else {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplaced";
                                    } 
                                }else{
                                    if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace"
                                        && lastKey == "Enter") {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplacedLastRecent";
                                        document.getElementById(i + ',' + guessArray[y].id).style.animationDelay = `${guessArray[y].id}s`;
                                        isAnimated = true;
                                        setTimeout(() => {
                                            isAnimated = false;
                                        }, 6000);
                                    } else {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplacedLast";
                                    }
                                }
                            }else{
                                if (guessArray[z].id != 4) {
                                    if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace"
                                        && lastKey == "Enter") {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrongRecent";
                                        document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id}s`;
                                        isAnimated = true;
                                        setTimeout(() => {
                                            isAnimated = false;
                                        }, 6000);
                                    } else {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrong";
                                    }
                                } else {
                                    if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrongLastRecent";
                                        document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id}s`;
                                        isAnimated = true;
                                        setTimeout(() => {
                                            isAnimated = false;
                                        }, 6000);
                                    } else {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrongLast";
                                    }
                                }
                            }
                        }
                    }
                }
                wordCharCounter = 0;
                guessCharCounter = 0;
            }
            
            // for (let x = 0; x < wordArray.length; x++) {
            //     for (let n = 0; n < guessArray.length; n++) {
            //         console.log(wordArray);
            //         console.log(guessArray);
            //         if (wordArray[x].id !== guessArray[n].id &&
            //             wordArray[x].char === guessArray[n].char && guessArray[n].id != 4) {
            //             if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" 
            //                 && lastKey == "Enter") {
            //                 document.getElementById(i + ',' + guessArray[n].id).className = "misplacedRecent";
            //                 document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${guessArray[n].id}s`;
            //             } else {
            //                 document.getElementById(i + ',' + guessArray[n].id).className = "misplaced";
            //             }
            //             tempWordArray.splice(x, 1);
            //             tempGuessArray.splice(n, 1);
            //          break;
            //         } else if (wordArray[x].id !== guessArray[n].id &&
            //             wordArray[x].char === guessArray[n].char && guessArray[n].id== 4) {
            //             if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" 
            //                 && lastKey == "Enter") {
            //                 document.getElementById(i + ',' + guessArray[n].id).className = "misplacedLastRecent";
            //                 document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${guessArray[n].id}s`;
            //             } else {
            //                 document.getElementById(i + ',' + guessArray[n].id).className = "misplacedLast";
            //             }
            //             tempWordArray.splice(x, 1);
            //             tempGuessArray.splice(n, 1); 
            //     break;
            //         }
            //     }
            //     if(x == wordArray.length -1){
            //         guessArray = tempGuessArray;
            //         wordArray = tempWordArray;
            //     }
            // }

            // for(let n =0; n <guessArray.length; n++){
            //     if (document.getElementById(i + ',' + guessArray[n].id).className == "input") {
            //         if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" 
            //             && lastKey == "Enter") {
            //             document.getElementById(i + ',' + guessArray[n].id).className = "wrongRecent";
            //             document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${guessArray[n].id}s`;
            //         } else {
            //             document.getElementById(i + ',' + guessArray[n].id).className = "wrong";
            //         }
            //     } else if (document.getElementById(i + ',' + guessArray[n].id).className == "inputLast") {
            //         if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
            //             document.getElementById(i + ',' + guessArray[n].id).className = "wrongLastRecent";
            //             document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${guessArray[n].id}s`;
            //         } else {
            //             document.getElementById(i + ',' + guessArray[n].id).className = "wrongLast";
            //         }
            //     }
            //     if (n == guessArray.length -1){
            //         wordArray = [];
            //         guessArray = [];
            //     }
            // }













            // for(let n =0; n < 5; n++){
            //     document.getElementById(i + ',' + n).value = guessesArray[i].charAt(n);
            
            //     if (guessesArray[i].charAt(n) == word.charAt(n) && n != 4){
            //         console.log(i == guessesArray.length - 1, guess.length == 0, lastKey != "Backspace", lastKey == "Enter");
            //         if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter"){
            //             document.getElementById(i + ',' + n).className = "correctRecent";
            //             document.getElementById(i + ',' + n).style.animationDelay = `${n}s`;
            //         }else{
            //             document.getElementById(i + ',' + n).className = "correct";
            //         }
            //     } else if (guessesArray[i].charAt(n) == word.charAt(n) && n == 4){
            //         if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
            //             document.getElementById(i + ',' + n).className = "correctLastRecent";
            //             document.getElementById(i + ',' + n).style.animationDelay = `${n}s`;
            //         } else {
            //             document.getElementById(i + ',' + n).className = "correctLast";
            //         }
            //     }
            // }
            // for (let x = 0; x < 5; x++) {
            //     let tempGuessArray = [];
            //     for (let n = 0; n < 5; n++){
            //         if (
            //             word.charAt(n) != guessesArray[i].charAt(n) &&
            //             word.charAt(x) != guessesArray[i].charAt(x) &&
            //             word.charAt(x) === guessesArray[i].charAt(n) 
            //             && tempGuessArray[n] != "misplaced"
            //             && n != 4){
            //                 tempGuessArray.push("misplaced");
            //             if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
            //                 document.getElementById(i + ',' + n).className = "misplacedRecent";
            //                 document.getElementById(i + ',' + n).style.animationDelay = `${n}s`;
            //             } else {
            //                 document.getElementById(i + ',' + n).className = "misplaced";
            //             }
            //         break;
            //         } else if (word.charAt(n) != guessesArray[i].charAt(n) &&
            //             word.charAt(x) != guessesArray[i].charAt(x) &&
            //             word.charAt(x) === guessesArray[i].charAt(n) &&
            //             n == 4){
            //             if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
            //                 document.getElementById(i + ',' + n).className = "misplacedLastRecent";
            //                 document.getElementById(i + ',' + n).style.animationDelay = `${n}s`;
            //             } else {
            //                 document.getElementById(i + ',' + n).className = "misplacedLast";
            //             }
            //         break;
            //         } else{
            //             tempGuessArray.push("nothing");
            //         }
            //     }
            //     console.log(tempGuessArray)
            // }
            // for (let n = 0; n < 5; n++) {
            //     if (document.getElementById(i + ',' + n).className == "input"){
            //         if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
            //             document.getElementById(i + ',' + n).className = "wrongRecent";
            //             document.getElementById(i + ',' + n).style.animationDelay = `${n}s`;
            //         } else {
            //             document.getElementById(i + ',' + n).className = "wrong";
            //         }
            //     } else if (document.getElementById(i + ',' + n).className == "inputLast"){
            //         if (i == guessesArray.length - 1 && guess.length == 0 && lastKey != "Backspace" && lastKey == "Enter") {
            //             document.getElementById(i + ',' + n).className = "wrongLastRecent";
            //             document.getElementById(i + ',' + n).style.animationDelay = `${n}s`;
            //         } else {
            //             document.getElementById(i + ',' + n).className = "wrongLast";
            //         }
            //     }
            // }
            if (guessesArray.length == 0) {
                document.getElementById('0,0').focus();
            }
            else if (i == guessesArray.length-1 && guessesArray.length != 6){
                document.getElementById((i +1 ) + ',0').focus();
            } else if (guessesArray.length == 6){
                document.getElementById('5,0').focus();
            } 
      
        }
 
        for(let i =0; i < guess.length; i ++){
            let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));

            if (guessesArray.length != 6){
                document.getElementById(currentRow + ',' + i).value = guess.charAt(i);
 
                if (guess.length && i < (guess.length ) && guess.length < 5){
                
                    document.getElementById(currentRow + ',' + (i+1)).focus();
                } else if (guess.length && i == (guess.length - 1) && guess.length == 5){
                    document.getElementById(currentRow + ',' + i).focus();
              
                }
            }
        
        }
        for (let i = 0; i < 3; i++) {
            for (let n = 0; n < guessesArray.length; n++) {
                for (let z = 0; z < 5; z++) {
                    let letter = guessesArray[n].charAt(z).toUpperCase();
                    if (i == 0) {
                        if (document.getElementById(n + ',' + z).className == "wrong" ||
                            document.getElementById(n + ',' + z).className == "wrongLast"){
                            document.getElementById(letter).className = "keyboardWrong";
                        } else if((document.getElementById(n + ',' + z).className == "wrongLastRecent" ||
                            document.getElementById(n + ',' + z).className == "wrongRecent") 
                            && document.getElementById(letter).className != "keyboardWrong"){
                            // document.getElementById(letter).className = "keyboardWrongRecent";
                            // document.getElementById(letter).style.animationDelay = '7s'; 
                            setTimeout(() => { document.getElementById(letter).className = "keyboardWrong" }, 6000);  
                            }
                    } else if (i == 1) {
                        if (document.getElementById(n + ',' + z).className == "misplaced" ||
                            document.getElementById(n + ',' + z).className == "misplacedLast"){
                            document.getElementById(letter).className = "keyboardMisplaced";
                        } else if ((document.getElementById(n + ',' + z).className == "misplacedLastRecent" ||
                            document.getElementById(n + ',' + z).className == "misplacedRecent") 
                            && document.getElementById(letter).className != "keyboardMisplaced"){
                            // document.getElementById(letter).className = "keyboardMisplacedRecent";
                            // document.getElementById(letter).style.animationDelay = '7s'; 
                            setTimeout(() => { document.getElementById(letter).className = "keyboardMisplaced" },6000); 
                        }
                    } else if (i == 2) {
                        if (document.getElementById(n + ',' + z).className == "correct" ||
                            document.getElementById(n + ',' + z).className == "correctLast"){
                            document.getElementById(letter).className = "keyboardCorrect";
                        } else if ((document.getElementById(n + ',' + z).className == "correctLastRecent" ||
                            document.getElementById(n + ',' + z).className == "correctRecent")
                            && document.getElementById(letter).className != "keyboardCorrect"
                            && document.getElementById(letter).className != "keyboardMisplaced") {
                            // document.getElementById(letter).className = "keyboardCorrectRecent";
                            // document.getElementById(letter).style.animationDelay = '7s'; 
                            setTimeout(() => { document.getElementById(letter).className = "keyboardCorrect" }, 6000); 
                        } else if ((document.getElementById(n + ',' + z).className == "correctLastRecent" ||
                            document.getElementById(n + ',' + z).className == "correctRecent")
                            && document.getElementById(letter).className == "keyboardMisplaced"){
                            // document.getElementById(letter).className = "keyboardMisToCorRecent";
                            // document.getElementById(letter).style.animationDelay = '7s';
                            setTimeout(() => { document.getElementById(letter).className = "keyboardCorrect" }, 6000); 
                            }
                    }
                }
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