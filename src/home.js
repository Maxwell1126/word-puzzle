import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import './home.css'
import StatChart from './statChart';


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

    statsList.current = [allStats.total, allStats.first, allStats.second, allStats.third, allStats.fourth,
    allStats.fifth, allStats.sixth, allStats.winPercent, allStats.streak]
    useEffect(() => {
        setStats(stats = statsList.current)
    }, [])
    statsCard = <div id="statsCard" className="statsCard">
        <div id="statChartContainer" className="statChartContainer">
        <StatChart />
        </div>
        <div className="statsContainer">
        <p className="statsRowPlayed">Played:  {statsList.current[0]}</p>
        <p className="statsRowWin">Win %: {statsList.current[7]}</p>
        <p className="statsRowStreak">Streak: {statsList.current[8]}</p>
        </div>
        </div>;
    
    
        return (
            <div align="center">
            <div id={"homeContainer"} className={"homeContainer"}>
                <h1>Word Puzzle</h1>
                
                {statsCard}
 
                
                <button className="homeButton" onClick={playButton}>{"P L A Y"}</button>
    </div>
            </div>
        );
    }

export default Home;