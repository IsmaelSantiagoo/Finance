import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { data } from './data';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';

const chartSetting = {
  width: 1100,
  height: 500,
  colors: ['rgb(56,189,248)', 'rgb(99,89,233)'],
  margin: {
    top: 15,
    bottom: 30,
    left: 70,
    right: 0,
  }
};

const valueFormatter = (value: number | null) => `${value?.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})}`;

export default function BarsData() {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'month', scaleType: 'band', tickLabelStyle: { fill: '#6359E9'}, disableTicks: true, disableLine: true}]}
      yAxis={[{ tickLabelStyle: { fill: '#6359E9'}, disableLine: true, disableTicks: true, valueFormatter}]}
      series={
        [
          {dataKey: 'london', valueFormatter},
          {dataKey: 'paris', valueFormatter},
          {dataKey: 'newYork', valueFormatter},
          {dataKey: 'seoul', valueFormatter}
        ]
      }
      {...chartSetting}
      borderRadius={10}
      grid={{horizontal: true}}
      sx = {
        {
          [`& .${chartsGridClasses.line}`]: { 
            strokeDasharray: '5 5', 
            strokeWidth: 2,
            stroke: '#6359E9'
          }
        }
      }
    />
  );
}
