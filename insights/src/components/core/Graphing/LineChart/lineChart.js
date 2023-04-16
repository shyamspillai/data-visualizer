import React from 'react';

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Scatter } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';
  
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const defaultProps = {
    options,
    data: {
        datasets: [
            {
                label: 'Empty Dataset',
                data: [{x: 0}, {y: 0}],
                backgroundColor: '#fdcf4e'
            }
        ]
    }
}  

export const LineChart = ({
    options= defaultProps.options,
    data= defaultProps.data
}) => {
  return <Scatter options={options} data={data} />;
}