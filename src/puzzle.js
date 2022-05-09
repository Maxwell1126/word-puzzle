import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;
import './keyboard.css'
import StatChart from './statChart';
// import './home.css';
function Puzzle(){
    const dispatchAction = useDispatch();

    let isAnimated = false;
    let gameOver = false;
    let playAgainButton = <button id= "playAgain" className="playAgain" onClick="">Play Again</button>
    let keyboardElements = document.querySelectorAll('.keyboardButton, .delEnterButton, .keyboardCorrect, .keyboardMisplaced, .keyboardWrong');
    
    useEffect(() => {
        dispatchAction({
            type: 'GET_GUESSES',
        })
    }, [])
    useEffect(() => {
        dispatchAction({
            type: 'POST_WORD',
        })
    }, [])
    useEffect(() => {

            dispatchAction({
                type: 'GET_STATS', payload:'home'
            })
        
    },[])

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
    let wordToGuess = useSelector((state => state.setWordToGuess.word.toLowerCase()));
    useEffect(() => {
        setWord(word= wordToGuess)
    })
    let statsList = useRef([]);
    let [stats, setStats] = useState({});
    
    let allStats = useSelector((state => state.setStats));
    console.log(allStats)
    statsList.current = [allStats.total, allStats.first, allStats.second, allStats.third, allStats.fourth, 
            allStats.fifth, allStats.sixth, allStats.winPercent, allStats.streak, allStats.best]
    
    useEffect(() => {

            setStats(stats = allStats)
    }, [allStats]);
    function getAllStats() {
        console.log(statsList.current[0], stats[0])
        return new Promise(resolve => {
            if (statsList.current[0] > stats[0]) {
                console.log('in here')
            dispatchAction({
                type: 'GET_STATS', payload: 'home'
            })
            setTimeout(() => {
                resolve('resolved');
            }, 200)
        }
        });
    }
    async function completeGetAllStats() {
        await getAllStats();
    }
    completeGetAllStats();
    let link = `https://www.merriam-webster.com/dictionary/${word}`
    let linkToDef=()=>{
        window.open(link, '_blank');
    }
    let dictionaryLink = <div id="dictionaryContainer" className="dictionaryContainer"><div id="panda" className="panda" ><p id="wordWas" className="wordWas">Word was: </p>
        <p id="dictionaryLink" className="dictionaryLink" onClick={linkToDef}><u>{word.toUpperCase()} </u></p></div></div>

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
        if (guesses[5].length > 0 || guesses[0] === word || guesses[1] === word || guesses[2] === word || guesses[3] === word || guesses[4] === word || isAnimated===true){
            event.preventDefault();
            
        }else{
            if (event.code.charAt(0) !== 'K' && event.code !== "Backspace" && event.code !== "Enter") {
                        event.preventDefault();
                    }
            else if (event.code.charAt(0) === 'K' ){
                if (document.getElementById(document.activeElement.id).value !== ""){
                    event.preventDefault();
                }else{
                    
                    dispatchAction({
                        type: 'BUILD_GUESS',
                        payload: event.key,
                    }) 
            
                }
            }
            else if (event.code === "Backspace"){
                if (document.getElementById(document.activeElement.id).id.charAt(2) === 0 && 
                    document.getElementById(document.activeElement.id).value === ""){
                    event.preventDefault();
                }
                else{
                    dispatchAction({
                        type: 'DELETE_LETTER',
                    })
            
                }
            }
            else if (event.code === "Enter"){
                if (document.getElementById(document.activeElement.id).id.charAt(2) == 4 &&
                    document.getElementById(document.activeElement.id).value != ""){
                    console.log(document.getElementById(document.activeElement.id).id.charAt(2), " ", document.getElementById(document.activeElement.id).value)
    
                    let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
                    let finalGuess = "";
                    for (let i = 0; i < 5; i++) {
                        finalGuess = finalGuess + document.getElementById(currentRow + ',' + i).value
                    }
                    let sendGuess= async () => dispatchAction({
                        type: 'POST_GUESS',
                        payload: {guess: finalGuess.toLowerCase(), id:(currentRow+1)}
                    })
                    
                    sendGuess()
            
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
        if (event.target.className !== "keyboardButton" || event.target.className !=="delEnterButton" ||
            (guesses[5].length > 0 || guesses[0] === word || guesses[1] === word || guesses[2] === word || guesses[3] === word || guesses[4] === word || isAnimated === true)){
            event.preventDefault();
        }
    }
    window.onmouseup = (event) => {
        if (event.target.className !== "keyboardButton" || event.target.className !== "delEnterButton" ||
            (guesses[5].length > 0 || guesses[0] === word || guesses[1] === word || guesses[2] === word || guesses[3] === word || guesses[4] === word || isAnimated === true)) {
            event.preventDefault();
        }
    }  

    let statsCard = <div id="statsCard" className="statsCard">
        <div id="statChartContainer" className="statChartContainer">
            <StatChart />
        </div>
        <div className="statsContainer">
            <p className="statsRowPlayed">Played:  {stats.total}</p>
            <p className="statsRowWin">Win %: {stats.winPercent}</p>
            <p className="statsRowStreak">Streak: {stats.streak}</p>
            <p className="statsRowBest">Best: {stats.best}</p>
        </div>
    </div>;

    let statsWindow = <div id="statsWindow" className="statsWindow">{statsCard}</div>;
        let rowDiv=[];
    
        let puzzleDiv="";
        for(let i=0; i<6; i++){
            let colDiv=[];
                for(let n=0; n<5; n++){
                    if(i===0 && n === 0){
                        colDiv.push(<input ref={firstInput} type="text" value="" autoFocus="" readOnly="readonly" id={i + `,` + n} 
                            className={"input"} maxLength={1} rows={1} cols={1}/>);
                    }else if(n === 4){
                        colDiv.push(<input type="text" value="" readOnly="readonly" id={i + `,` + n} 
                            className={"inputLast"} maxLength={1} rows={1} cols={1}/>);
                            if(i === 5){
                                rowDiv.push(<div className={"rowContainerLast"} id={i}>{colDiv}</div>);
                            }else{
                                rowDiv.push(<div className={"rowContainer"} id={i}>{colDiv}</div>);
                            }
                        
                    }else{
                        colDiv.push(<input type="text" value="" readOnly="readonly" id={i + `,` + n} 
                            className={"input"} maxLength={1} rows={1} cols={1}/>);
                    }
                }
            let puzzleParent = <div className="puzzleParent"><div id="allRowContainer" className="allRowContainer">{rowDiv} </div> {statsWindow}</div>;
            
            puzzleDiv = <div className={"puzzleContainer"}>
                <div id="headerDiv" className="headerDiv"><h1>Word Puzzle</h1><button id="showPuzzle" className="showPuzzle" onclick=""></button>
                    <button id="showStats" className="showStats" onclick=""></button></div>
                {puzzleParent}
                <div id="conditionallyRender" className="conditionallyRender">{dictionaryLink}{playAgainButton}
                <div id="p" className='pNormal' >Word Not in the Dictionary</div></div></div>;
            }
    
    // let counter = 0;
    // useEffect(() => {
    //     document.addEventListener('animationend', () => {
            // document.getElementById("p").className = "pNormal";
            // let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
            // for(let i =0; i < 5; i++){
            //     if (document.getElementById((currentRow) + ',' + i).className === "notWord") {
            //         document.getElementById((currentRow) + ',' + i).className = "input";
                 
            //     } else if (document.getElementById((currentRow) + ',' + i).className === "notWordLast") {
            //         document.getElementById((currentRow) + ',' + i).className = "inputLast";
            //         document.getElementById("p").className = "pNormal";
            //         counter = 0;
              
            //     }
            // }
            
            // if (guessesList.current[5].length > 0 || guessesList.current[0].length === 0){
            //     currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
                
            // }else{
                
            //     currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0) - 1);
            // }
            // if (counter < 5){           
            
            //     if (document.getElementById(currentRow + ',' + counter).className === "correctRecent"){
            //         document.getElementById(currentRow + ',' + counter).className = "correct";
            //     } else if (document.getElementById(currentRow + ',' + counter).className === "misplacedRecent"){
            //         document.getElementById(currentRow + ',' + counter).className = "misplaced";
            //     } else if (document.getElementById(currentRow + ',' + counter).className === "wrongRecent"){
            //         document.getElementById(currentRow + ',' + counter).className = "wrong";
            //     } else if (document.getElementById(currentRow + ',' + counter).className === "correctLastRecent") {
            //         document.getElementById(currentRow + ',' + counter).className = "correctLast";
            //     } else if (document.getElementById(currentRow + ',' + counter).className === "misplacedLastRecent") {
            //         document.getElementById(currentRow + ',' + counter).className = "misplacedLast";
            //     } else if (document.getElementById(currentRow + ',' + counter).className === "wrongLastRecent") {
            //         document.getElementById(currentRow + ',' + counter).className = "wrongLast";
            //     }
            //     counter++;
            // }else{
            //     counter = 0;
            // }  
            // if (document.getElementById(currentRow + ',4').className === "correctLast" ||
            //     document.getElementById(currentRow + ',4').className === "misplacedLast" ||
            //     document.getElementById(currentRow + ',4').className === "wrongLast" ||
            //     document.getElementById(currentRow + ',4').className === "inputLast"){
            //     }  
    //     });
    // }, []);
       
    function renderGuess () {
        let guessesArray = [];
    
        function setAnimatedFalse(){
            setTimeout(() => {
                isAnimated = false;
                for (let i = 0; i < keyboardElements.length - 1; i++) {
                    keyboardElements[i].disabled = "";
                }
            }, 2500);
        }
        for (let i = 0; i < guesses.length; i++){

            if (guesses[i].length >0){
                guessesArray.push(guesses[i]);
            }
        }

        if(guesses[0]!== undefined){
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
                if (wordArray[n] !== undefined && guessArray[n] !== undefined) {
                document.getElementById(i + ',' + n).value = guessesArray[i].charAt(n);
                if (wordArray[n].char === guessArray[n].char && 
                    wordArray[n].id === guessArray[n].id && guessArray[n].id !== 4){
                    if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace" 
                        && lastKey === "Enter") {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correctRecent";
                        document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${guessArray[n].id*.25}s`;
                        isAnimated=true;
                        setAnimatedFalse();
                    } else {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correct";
                    }
                } else if (wordArray[n].char === guessArray[n].char && 
                           wordArray[n].id === guessArray[n].id && guessArray[n].id === 4) {
                    if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace" 
                        && lastKey === "Enter") {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correctLastRecent";
                        document.getElementById(i + ',' + guessArray[n].id).style.animationDelay = `${n*.25}s`;
                        isAnimated = true;
                        setAnimatedFalse();
                    } else {
                        document.getElementById(i + ',' + guessArray[n].id).className = "correctLast";
                    }     
                }
                else{
                    tempWordArray.push(wordArray[n]);
                    tempGuessArray.push(guessArray[n]);
                }
                if(n === 4){
                    guessArray = tempGuessArray;
                    wordArray = tempWordArray;
                }
            }
            }
            let wordCharCounter = 0;
            let guessCharCounter = 0;
            for(let z = 0; z < wordArray.length; z++){

                for(let y = 0; y < wordArray.length; y++){
                    if(guessArray[z].char === wordArray[y].char){
                        wordCharCounter ++;
                    }
                }

                if(wordCharCounter === 0){
                    if (guessArray[z].id !== 4){
                        if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace"
                            && lastKey === "Enter") {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrongRecent";
                            document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id*.25}s`;
                            isAnimated = true;
                            setAnimatedFalse();
                        } else {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrong";
                        }
                    }else{
                        if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace" && lastKey === "Enter") {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrongLastRecent";
                            document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id*.25}s`;
                            isAnimated = true;
                            setAnimatedFalse();
                        } else {
                            document.getElementById(i + ',' + guessArray[z].id).className = "wrongLast";
                        }
                    }
                    
                } else{
                    for (let y = 0; y < wordArray.length; y++) {
                      
                        if (guessArray[z].char === guessArray[y].char) {
                            guessCharCounter++;
                            if (guessCharCounter <= wordCharCounter) {
                                if (guessArray[y].id !== 4) {
                                    if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace"
                                        && lastKey === "Enter") {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplacedRecent";
                                        document.getElementById(i + ',' + guessArray[y].id).style.animationDelay = `${guessArray[y].id*.25}s`;
                                        isAnimated = true;
                                        setAnimatedFalse();
                                    } else {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplaced";
                                    } 
                                }else{
                                    if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace"
                                        && lastKey === "Enter") {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplacedLastRecent";
                                        document.getElementById(i + ',' + guessArray[y].id).style.animationDelay = `${guessArray[y].id*.25}s`;
                                        isAnimated = true;
                                        setAnimatedFalse();
                                    } else {
                                        document.getElementById(i + ',' + guessArray[y].id).className = "misplacedLast";
                                    }
                                }
                            }else{
                                if (guessArray[z].id !== 4) {
                                    if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace"
                                        && lastKey === "Enter") {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrongRecent";
                                        document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id*.25}s`;
                                        isAnimated = true;
                                        setAnimatedFalse();
                                        
                                    } else {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrong";
                                    }
                                } else {
                                    if (i === guessesArray.length - 1 && guess.length === 0 && lastKey !== "Backspace" && lastKey === "Enter") {
                                        document.getElementById(i + ',' + guessArray[z].id).className = "wrongLastRecent";
                                        document.getElementById(i + ',' + guessArray[z].id).style.animationDelay = `${guessArray[z].id*.25}s`;
                                        isAnimated = true;
                                        setAnimatedFalse();
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
           
            if (guessesArray.length === 0) {
                document.getElementById('0,0').focus();
            }
            else if (i === guessesArray.length-1 && guessesArray.length !== 6){
                document.getElementById((i +1 ) + ',0').focus();
            } else if (guessesArray.length === 6){
                document.getElementById('5,0').focus();
            } 
      
        }
    }
        for(let i =0; i < guess.length; i ++){
            let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));

            if (guessesArray.length !== 6){
                document.getElementById(currentRow + ',' + i).value = guess.charAt(i);
 
                if (guess.length && i < (guess.length ) && guess.length < 5){
                
                    document.getElementById(currentRow + ',' + (i+1)).focus();
                } else if (guess.length && i === (guess.length - 1) && guess.length === 5){
                    document.getElementById(currentRow + ',' + i).focus();
              
                }
            }
        
        }
       
        function keyboardElementsActivate(ele){
            setTimeout(() => {
                ele.disabled = "";
            }, 2500);
        }
        for (let i = 0; i < keyboardElements.length - 1; i++) {
            if(guessesArray[0]){
                if (document.getElementById(guessesArray.length-1+ ',0').className == "wrong" ||
                    document.getElementById(guessesArray.length - 1 + ',0').className == "misplaced" ||
                    document.getElementById(guessesArray.length - 1 + ',0').className == "correct" ||
                    document.getElementById(guessesArray.length - 1 + ',0').className == "input"){
                    keyboardElements[i].disabled = "";
                }else{
                    keyboardElements[i].disabled = "disabled";
                }
            }
        }
        for (let i = 0; i < keyboardElements.length - 1; i++) {
            keyboardElementsActivate(keyboardElements[i])
        }
        for (let i = 0; i < 3; i++) {
            for (let n = 0; n < guessesArray.length; n++) {
                for (let z = 0; z < 5; z++) {
                    let letter = guessesArray[n].charAt(z).toUpperCase();
                    if (i === 0) {
                        if (document.getElementById(n + ',' + z).className === "wrong" ||
                            document.getElementById(n + ',' + z).className === "wrongLast"){
                            document.getElementById(letter).className = "keyboardWrong";
                        } else if((document.getElementById(n + ',' + z).className === "wrongLastRecent" ||
                            document.getElementById(n + ',' + z).className === "wrongRecent") 
                            && document.getElementById(letter).className !== "keyboardWrong"
                            && document.getElementById(letter).className !== "keyboardMisplaced"
                            && document.getElementById(letter).className !== "keyboardCorrect"){
                            setTimeout(() => { document.getElementById(letter).className = "keyboardWrong" }, 2500);  
                            }
                    } else if (i === 1) {
                        if (document.getElementById(n + ',' + z).className === "misplaced" ||
                            document.getElementById(n + ',' + z).className === "misplacedLast"){
                            document.getElementById(letter).className = "keyboardMisplaced";
                        } else if ((document.getElementById(n + ',' + z).className === "misplacedLastRecent" ||
                            document.getElementById(n + ',' + z).className === "misplacedRecent") 
                            && document.getElementById(letter).className !== "keyboardMisplaced"
                            && document.getElementById(letter).className !== "keyboardCorrect"){
                            setTimeout(() => { document.getElementById(letter).className = "keyboardMisplaced" },2500); 
                        }
                    } else if (i === 2) {
                        if (document.getElementById(n + ',' + z).className === "correct" ||
                            document.getElementById(n + ',' + z).className === "correctLast"){
                            document.getElementById(letter).className = "keyboardCorrect";
                        } else if ((document.getElementById(n + ',' + z).className === "correctLastRecent" ||
                            document.getElementById(n + ',' + z).className === "correctRecent")
                            && document.getElementById(letter).className !== "keyboardCorrect") {
                            setTimeout(() => { document.getElementById(letter).className = "keyboardCorrect" }, 2500); 
                        } else if ((document.getElementById(n + ',' + z).className === "correctLastRecent" ||
                            document.getElementById(n + ',' + z).className === "correctRecent")
                            && document.getElementById(letter).className === "keyboardMisplaced"){
                            setTimeout(() => { document.getElementById(letter).className = "keyboardCorrect" }, 2500); 
                            }
                    }
                }
            }
            
        }
        
        document.getElementById("playAgain").style.display = "none";
        document.getElementById("dictionaryLink").style.display = "none";
        document.getElementById("wordWas").style.display = "none";
        document.getElementById("dictionaryContainer").style.display = "none";
        document.getElementById("panda").style.display = "none";
        if ((guessesArray[guessesArray.length - 1] === word && word !== "") || (guesses[5].length > 0 && word !== "")) {
            let winOrLoss = 0;
            if (guessesArray[guessesArray.length - 1] === word){
                winOrLoss = 1
            }else{
                winOrLoss=0;
            }
            function postRecord(){
                return new Promise(resolve => {
                dispatchAction({
                    type: 'POST_RECORD',
                    payload: { round: guessesArray.length, win: winOrLoss },
                })
                    setTimeout(() => {
                        resolve('resolved');
                    }, 200)
                });
            }
            async function completePostRecord(){
                await postRecord();
            }
            completePostRecord();
            
            gameOver = true;
            console.log(stats[0])
            if (document.getElementById((guessesArray.length - 1) + ',0').className ==="correctRecent" || 
                document.getElementById((guessesArray.length - 1) + ',0').className === "misplacedRecent" ||
                document.getElementById((guessesArray.length - 1) + ',0').className === "wrongRecent"){
               
               
                setTimeout(() => {
                    document.getElementById("conditionallyRender").style.marginBottom = "5px";
                    document.getElementById("dictionaryContainer").style.display = "inline-flex";
                    document.getElementById("panda").style.display = "inline";
                    document.getElementById("playAgain").style.display = "inline-block";
                    document.getElementById("dictionaryLink").style.display = "inline";
                    document.getElementById("wordWas").style.display = "inline";
                    document.getElementById("allRowContainer").style.opacity = "5%";
                    document.getElementById("statsCard").style.border = "none";
                    document.getElementById("statsWindow").style.opacity = "100%";
                    document.getElementById("showPuzzle").style.display = "inline";
                    document.getElementById("showStats").style.display = "none";
                    
                }, 2500);
            }else{
                document.getElementById("conditionallyRender").style.marginBottom = "5px";
                    document.getElementById("dictionaryContainer").style.display = "inline-flex";
                    document.getElementById("panda").style.display = "inline";
                    document.getElementById("playAgain").style.display = "inline-block";
                    document.getElementById("dictionaryLink").style.display = "inline";
                    document.getElementById("wordWas").style.display = "inline";
                    document.getElementById("allRowContainer").style.opacity = "5%";
                    document.getElementById("statsCard").style.border = "none";
                    document.getElementById("statsWindow").style.opacity = "100%";
                    document.getElementById("showPuzzle").style.display = "inline";
                    document.getElementById("showStats").style.display = "none";
                
            }
            
        }
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                if (guessesArray[0]) {
                    if (document.getElementById(guessesArray.length - 1 + ',' + i).className == "correctRecent") {
                        console.log(document.getElementById(guessesArray.length - 1 + ',' + i).className)
                        document.getElementById(guessesArray.length - 1 + ',' + i).classname = "correct";
                    } else if (document.getElementById(guessesArray.length - 1 + ',' + i).className == "correctLastRecent") {
                        console.log(document.getElementById(guessesArray.length - 1 + ',' + i).className)
                        document.getElementById(guessesArray.length - 1 + ',' + i).classname = "correctLast";
                    } else if (document.getElementById(guessesArray.length - 1 + ',' + i).className == "misplacedRecent") {
                        console.log(document.getElementById(guessesArray.length - 1 + ',' + i).className)
                        document.getElementById(guessesArray.length - 1 + ',' + i).classname = "misplaced";
                    } else if (document.getElementById(guessesArray.length - 1 + ',' + i).className == "misplacedLastRecent") {
                        console.log(document.getElementById(guessesArray.length - 1 + ',' + i).className)
                        document.getElementById(guessesArray.length - 1 + ',' + i).classname = "misplacedLast";
                    } else if (document.getElementById(guessesArray.length - 1 + ',' + i).className == "wrongRecent") {
                        console.log(document.getElementById(guessesArray.length - 1 + ',' + i).className)
                        document.getElementById(guessesArray.length - 1 + ',' + i).classname = "wrong";
                    } else if (document.getElementById(guessesArray.length - 1 + ',' + i).className == "wrongLastRecent") {
                        console.log(document.getElementById(guessesArray.length - 1 + ',' + i).className)
                        document.getElementById(guessesArray.length - 1 + ',' + i).classname = "wrongLast";
                    }
                }
            }
        }, 2500);
        let deleteWord = () => {
            return new Promise(resolve => {
                console.log('here 2 ')
                dispatchAction({
                    type: 'DELETE_WORD',
                })
                setTimeout(() => { 
                resolve('resolved');
                }, 200)
            });
        }

        let resetGuesses = ()=>{
            return new Promise(resolve => {
                console.log('here')
                dispatchAction({
                    type: 'RESET_GUESSES',
                })
                document.getElementById("statsWindow").style.opacity = "0%";
                document.getElementById("showPuzzle").style.display = "none";
                document.getElementById("showStats").style.display = "none";
                document.getElementById("allRowContainer").style.opacity = "100%";
                document.getElementById("statsCard").style.border = "2px solid rgb(181, 178, 178)";
                setTimeout(() => { 
                resolve('resolved');
                }, 200)
            });
        }

        async function playAgain(){
            document.getElementById("conditionallyRender").style.marginBottom = "0px";
                console.log('play again');
                for (let i = 0; i < 6; i++) {
                    for (let n = 0; n < 5; n++) {
                        if (n === 4) {
                            document.getElementById(i + ',' + n).className = "inputLast";
                        } else {
                            document.getElementById(i + ',' + n).className = "input";
                        }
                    }
                }
                let buttonsList = document.querySelectorAll("button");
                for (let i = 0; i < buttonsList.length; i++) {
                    if (buttonsList[i].className === "keyboardCorrect" ||
                        buttonsList[i].className === "keyboardMisplaced" ||
                        buttonsList[i].className === "keyboardWrong") {
                        buttonsList[i].className = "keyboardButton"
                    }
                }
                await resetGuesses();
                await deleteWord();
                firstInput.current.focus();
        }
        function showStats() {
            document.getElementById("allRowContainer").style.opacity = "5%";
            document.getElementById("statsCard").style.border = "none";
            document.getElementById("statsWindow").style.opacity = "100%";
            document.getElementById("showPuzzle").style.display = "inline";
            document.getElementById("showStats").style.display = "none";
        }
        function showPuzzle() {
            document.getElementById("allRowContainer").style.opacity = "100%";
            document.getElementById("statsCard").style.border = "2px solid rgb(181, 178, 178)";
            document.getElementById("statsWindow").style.opacity = "0%";
            document.getElementById("showPuzzle").style.display = "none";
            document.getElementById("showStats").style.display = "inline";
        }
        document.getElementById("playAgain").onclick = playAgain;
        document.getElementById("showPuzzle").onclick = showPuzzle;
        document.getElementById("showStats").onclick = showStats;

        
      
    }  
    
    useEffect(()=> {
        if (guessesList.current.length > 0){
            renderGuess();
            
        }     
    })

    return (
            <div className="container">
                
                    {puzzleDiv}
                
                <Keyboard />
            </div>
    );
}

export default (Puzzle);