import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
    }, [])


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
);

const options = {
    responsive: false,
    plugins: {
    },
};

const labels = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

let data = {
    labels,
    datasets: [
        {
            data: stats.map((stats, item) => statsList.current[item]),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};
    return <Bar options={options} data={data} />;
}

export default StatChart;