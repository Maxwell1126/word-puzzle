import React, { Component } from 'react';

import { useNavigate} from 'react-router-dom';




function Home(){
    
let navigate = useNavigate();
const playButton = (event) => {
    navigate('/puzzle');
}        
//     let word = "abcda";
//     let guess = "abcab";
//     let inputArray = [<input id={"0"} className="" readOnly="" />,
//     <input id={"1"} className="" readOnly="" />,
//     <input id={"2"} className="" readOnly="" />,
//     <input id={"3"} className="" readOnly="" />,
//     <input id={"4"} className="" readOnly="" />];
//  function doingStuff(){
//      for (let i = 0; i < 5; i++) {
//          if (word.charAt(i) == guess.charAt(i)) {
//             document.getElementById(i.toString()).className = "right";
//          }
//      }

//      for (let x = 0; x < 5; x++){
//          for (let n = 0; n < 5; n++){
//              if (
//                  word.charAt(n) != guess.charAt(n) &&
//                  word.charAt(x) != guess.charAt(x) &&
//                  word.charAt(x) === guess.charAt(n)){
//                  document.getElementById(n.toString()).className = "misplaced";
//                  break;
//             }
//         }
//      }


//      console.log(document.getElementById("container"));
//  }
    

        return (
            <div id ={"container"}>
                <button onClick={playButton}>Play</button>
             {/* {inputArray} */}
             {/* <button onClick={doingStuff}>do stuff</button> */}
            </div>
        );
    }

export default Home;