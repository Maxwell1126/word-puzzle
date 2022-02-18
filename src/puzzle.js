import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;
function Puzzle(){

    // const [currentGuess, setWordToGuess] = useState("");
    const dispatch = useDispatch();
    const theCurrentGuess = useSelector(state => state.setWordToGuess)
    console.log(theCurrentGuess)
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
        if (event.code.charAt(0) != 'K' && event.code != "Backspace") {
                    event.preventDefault();
                }
        else if (event.code.charAt(0) == 'K'){
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 4 &&
                    document.getElementById(document.activeElement.id).value != ""){
                event.preventDefault();
            }else{
                document.getElementById(document.activeElement.id).value = event.key;
                assignFocus(event.code.charAt(0));   
            }
        }
        else if (event.code == "Backspace"){
            if (document.getElementById(document.activeElement.id).id.charAt(2) == 0 && 
                    document.getElementById(document.activeElement.id).value == ""){
                event.preventDefault();
            }
            else{
                assignFocus(event.code);
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

    
        let rowDiv=[];

    function assignFocus(code){
        let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
        let currentColumn = parseInt(document.getElementById(document.activeElement.id).id.charAt(2));   
            
                if (code == "K") {
                    console.log();
                if (document.getElementById(currentRow + ',' + currentColumn).value == "") {
                    document.getElementById(currentRow + ',' + currentColumn).focus();
                } else if (document.getElementById(currentRow + ',' + currentColumn).value && currentColumn != 4){
                    document.getElementById(currentRow + ',' + currentColumn).blur();
                    document.getElementById(currentRow + ',' + (currentColumn+1)).focus();
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
            
        return (
            <div className="container">
                {puzzleDiv}
                <Keyboard />
            </div>
        );

    }

export default (Puzzle);