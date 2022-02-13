import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css'
class Puzzle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        let rowDiv=[];
        let puzzleDiv="";
        for(let i=1; i<7; i++){
            console.log("in first loop" + i);
            let colDiv=[];
                for(let n=1; n<6; n++){
                    console.log("in second loop" + n);
                    
                    console.log(colDiv);
                    if(n == 5){
                        colDiv.push(<textarea id={i + `,` + n} className={"textareaLast"} maxLength={1} rows={1} cols={1}></textarea>);
                       rowDiv.push(<div className={"rowContainer"} id={i}>{colDiv}</div>);
                       console.log(rowDiv);
                    }else{
                        colDiv.push(<textarea id={i + `,` + n} className={"textarea"} maxLength={1} rows={1} cols={1}></textarea>);
                    }
                }
            puzzleDiv = <div className={"puzzleContainer"}>{rowDiv}</div>;
            }
        return (
            <div className="container">
                <h1>Word Puzzle</h1>
                {puzzleDiv}
            </div>
        );

    }


}

const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(Puzzle);