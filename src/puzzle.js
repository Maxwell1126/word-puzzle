import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
import Keyboard from './keyboard' ;
class Puzzle extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let rowDiv=[];
        let puzzleDiv="";
        for(let i=1; i<7; i++){
            let colDiv=[];
                for(let n=1; n<6; n++){
                    if(i==1 && n == 1){
                        colDiv.push(<textarea  autoFocus="autofocus" readOnly="" id={i + `,` + n} className={"textarea"} maxLength={1} rows={1} cols={1}></textarea>);
                    }else if(n == 5){
                        colDiv.push(<textarea readOnly="readonly" id={i + `,` + n} className={"textareaLast"} maxLength={1} rows={1} cols={1}></textarea>);
                        rowDiv.push(<div className={"rowContainer"} id={i}>{colDiv}</div>);
                    }else{
                        colDiv.push(<textarea readOnly="readonly" id={i + `,` + n} className={"textarea"} maxLength={1} rows={1} cols={1}></textarea>);
                    }
                }
            puzzleDiv = <div className={"puzzleContainer"}>{rowDiv}</div>;
            }

        if (rowDiv[0].props.children[0].props.value){
            rowDiv[0].props.children[0].props.autoFocus = "";
            }
            
        return (
            <div className="container">
                <h1>Word Puzzle</h1>
                {puzzleDiv}
                <Keyboard />
            </div>
        );

    }


}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Puzzle);