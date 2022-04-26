import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import './App.css'


function Home(){
    const dispatchAction = useDispatch();    
    let navigate = useNavigate();
    const playButton = (event) => {
        navigate('/puzzle');
    } 
    let statsCard = <div id="statsCard" className = "statsCard"></div>;
    useEffect(() => {
        dispatchAction({
            type: 'GET_STATS', payload:'home'
        })
    }, [dispatchAction])
 
    let statsList = useRef([]);
    let [stats, setStats] = useState([]);
    let allStats = useSelector((state => state.setStats));
    console.log(allStats)
    statsList.current = [allStats.total, allStats.first, allStats.second, allStats.third, allStats.fourth,
    allStats.fifth, allStats.sixth, allStats.winPercent, allStats.streak]
    useEffect(() => {
        setStats(stats = statsList.current)
    }, [])
    statsCard = <div id="statsCard" className="statsCard">
        <p className="statsRow">played: {statsList.current[0]}</p>
        <p className="statsRow">first: {statsList.current[1]}</p>
        <p className="statsRow">second: {statsList.current[2]}</p>
        <p className="statsRow">third: {statsList.current[3]}</p>
        <p className="statsRow">fourth: {statsList.current[4]}</p>
        <p className="statsRow">fifth: {statsList.current[5]}</p>
        <p className="statsRow">sixth: {statsList.current[6]}</p>
        <p className="statsRow">win percentage: {statsList.current[7]}%</p>
        <p className="statsRow">streak: {statsList.current[8]}</p></div>;
    console.log(statsList.current [6])

    // let renderStatState = ()=>{
    //     return new Promise(resolve => {
       
    //         setTimeout(() => {
    //             resolve('resolved');
    //         }, 200)
    //     });
    // }

    

        return (
            <div id={"homeContainer"} className={"homeContainer"}>
                {statsCard}
                <button className="homeButton" onClick={playButton}>{"P L A Y"}</button>
            </div>
        );
    }

export default Home;