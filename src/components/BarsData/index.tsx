import { BarChart } from '@mui/x-charts/BarChart';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { useState, useEffect, useRef } from 'react';
import { getAnalytics } from './services';
import { notify } from '@/utils/notify';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const valueFormatter = (value: number | null) => `${value?.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})}`;

export default function BarsData({ dataInicio }: BarsDataProps) {

  const [data, setData] = useState<Array<{}>>([])
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Define a função que ajusta o tamanho do gráfico conforme o container muda de tamanho
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        });
      }
    };

    // Observa o redimensionamento da div pai
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

    getAnalytics({ dataInicio: dataInicio}).then((data) => setData(data)).catch(() => notify('Erro ao carregar analytics!', 'error'))
    console.log(data)
  }, [dataInicio])

  const chartSetting = {
    width: dimensions.width,
    height: dimensions.height,
    colors: ['rgb(56,189,248)', 'rgb(99,89,233)'],
    margin: {
      top: 15,
      bottom: 30,
      left: 70,
      right: 0,
    }
  };

  return (
    data && data.length > 0 ? 
    <div ref={containerRef} style={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    </div> :
    <div className="flex min-h-[350px] justify-center items-center p-5 gap-2 bg-projectPallet-quaternary rounded-b-xl">
      <FontAwesomeIcon icon={faTriangleExclamation} className="text-orange-500 text-xl"/>
      <p className="text-md">
        Nenhum item encontrado!
      </p>
    </div>
  );
}
