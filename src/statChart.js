import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function StatChart() {
    const dispatchAction = useDispatch();  
    useEffect(() => {
        dispatchAction({
            type: 'GET_STATS', payload: 'home'
        })
    }, [dispatchAction])

    let statsList = useRef([]);
    let [stats, setStats] = useState([]);
    let allStats = useSelector((state => state.setStats));

    statsList.current = [ allStats.first, allStats.second, allStats.third, allStats.fourth,
    allStats.fifth, allStats.sixth]
    useEffect(() => {
        setStats(stats = statsList.current)
    }, [allStats])


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
    );
    const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

    let data = {
        labels,
        datasets: [
            {
                data: stats.map((stats, item) => statsList.current[item]),
                backgroundColor: 'rgb(92, 255, 144)',
                barThickness: 15,
                height:2,
   
            }
        ],
    };
 

    let options = {
     
        // aspectRatio:1,
        indexAxis: 'y',
        layout: {
            padding: 20,
            height: 2,
        },
        maintainAspectRatio:false,
        scales: {
            
            y: {
                // display:false,
                ticks: {
                    color: "rgb(181, 178, 178)",
                }, 
                grid: {
                    color: "rgba(19, 19, 19)",
                },
                border: { color: "rgba(19, 19, 19)", },
            },
            x: {
                display:false,
                ticks:{
                    color: "rgba(19, 19, 19)",
                },
                grid: {
                    color: "rgba(19, 19, 19)",
                },
                border: {color: "rgba(19, 19, 19)",},
        },
    },

        responsive: true,
    
        plugins: {
            datalabels: {
            color:'white',
            anchor: "end",
            offset: -20,
            align: "start"
            },
        },
    };


    return <Bar options={options} plugins={[ChartDataLabels]} data={data} />;
}

export default StatChart;