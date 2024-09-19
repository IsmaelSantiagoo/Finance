import { BarChart } from '@mui/x-charts/BarChart';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { useState, useEffect } from 'react';
import { getAnalytics } from './services';

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

  const [data, setData] = useState<Array<{}>>([])

  useEffect(() => {

    getAnalytics().then((data) => setData(data))
  }, [])

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'month', scaleType: 'band', tickLabelStyle: { fill: '#6359E9'}, disableTicks: true, disableLine: true}]}
      yAxis={[{ tickLabelStyle: { fill: '#6359E9'}, disableLine: true, disableTicks: true, valueFormatter}]}
      series={
        [
          {dataKey: 'total', valueFormatter},
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
