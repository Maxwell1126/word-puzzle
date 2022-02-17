import React, { Component, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;
function Puzzle(){

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
    window.addEventListener('keydown', (event) => {
        if (event.code.charAt(0) != 'K' && event.code != "Backspace") {
                    event.preventDefault();
                }
        else if (event.code.charAt(0) == 'K'){
            console.log(document.getElementById(document.activeElement.id));
            console.log(event.key);
            document.getElementById(document.activeElement.id).value = event.key;
            console.log(document.getElementById(document.activeElement.id).value);
            assignFocus(event.code.charAt(0));   
        }
        else if (event.code == "Backspace"){
            document.getElementById(document.activeElement.id).value = "";
            assignFocus(event.code); 
        }
    });
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
        
        console.log('in assignFocus');
        if(rowDiv.length >0){
            // if(code == "K"){
        for (let i = 0; i < 6; i++) {
            for (let n = 0; n < 5; n++) {
                console.log(document.getElementById(i + ',' + n).value)
                if (document.getElementById(i + ',' + n).value == "") {
                    console.log(document.getElementById(i + ',' + n).id.charAt(0), " hello")
                    document.getElementById(i + ',' + n).focus();
                    return;
                } else if (document.getElementById(i + ',' + n).value && n != 4){
                    console.log(document.getElementById(i + ',' + (n + 1)), " hey")
                    document.getElementById(i + ',' + n).blur();
                    document.getElementById(i + ',' + (n+1)).focus();
                }
            }
        }
            console.log(rowDiv[0].props.children[0].props.value);
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

console.log(rowDiv[0].props.children[0].props.value)
            
        return (
            <div className="container">
                {puzzleDiv}
                <Keyboard />
            </div>
        );

    }




const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Puzzle);