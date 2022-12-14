
import './MyChart.scss';

import React,{useEffect,useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


  export const options = {


    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Correlation data',
      },
    },
  };



const Mychart = () => {
  const[cors,setCors]=useState([]);
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/trend/api/')
    .then(res => {
      return res.json();

    })
    .then(data => {
      console.log(data);
      setCors(data)


    });
  },[]);

  var data = {
   labels: cors.map((cor)=>cor.Feature),
   datasets: [{
     label: 'Correlation data',
     data:  cors.map((cor)=>cor.pearson_correlation),
     backgroundColor: [
       'rgba(255, 99, 132, 0.2)',
       'rgba(54, 162, 235, 0.2)',
       'rgba(255, 206, 86, 0.2)',
       'rgba(75, 192, 192, 0.2)',
       'rgba(153, 102, 255, 0.2)',
       'rgba(255, 159, 64, 0.2)'
     ],
     borderColor: [
       'rgba(255, 99, 132, 1)',
       'rgba(54, 162, 235, 1)',
       'rgba(255, 206, 86, 1)',
       'rgba(75, 192, 192, 1)',
       'rgba(153, 102, 255, 1)',
       'rgba(255, 159, 64, 1)'
     ],
     borderWidth: 1
   }]
 };






  return (
    <div className="mychart">
        <div className="title"></div>
          <Bar options={options} data={data} />
    </div>
  )
}

export default Mychart
