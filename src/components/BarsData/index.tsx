import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { data } from './data';

const chartSetting = {
  width: 1200,
  height: 500,
  colors: ['rgb(56,189,248)', 'rgb(99,89,233)'],
  margin: {
    top: 15,
    bottom: 30,
    left: 42,
    right: 28,
  },
};

const valueFormatter = (value: number | null) => `R$ ${value}`;

export default function BarsData() {
  return (
    <div>
      <BarChart
        dataset={data}
        xAxis={[{ dataKey: 'month', scaleType: 'band', }]}
        series={[
          {dataKey: 'london', valueFormatter},
          {dataKey: 'paris', valueFormatter}
        ]}
        {...chartSetting}
        className='w-full'
        borderRadius={10}
      />
    </div>
  );
}
