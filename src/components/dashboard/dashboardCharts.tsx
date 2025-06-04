import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../api/endpoints/dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DashboardCharts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => dashboardService.getFullReport(),
  });

  if (isLoading) return <div>Carregando...</div>;

  const cropColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
    '#FF9F40', '#8AC24A', '#EA80FC', '#00ACC1', '#FF5722'
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      <Box sx={{ width: 400 }}>
        <h3>Fazendas por Estado</h3>
        <Pie data={{
          labels: data?.data.charts.byState.map((item: any) => item.state),
          datasets: [{
            data: data?.data.charts.byState.map((item: any) => item.count),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
            ],
          }]
        }} />
      </Box>
      
      <Box sx={{ width: 400 }}>
        <h3>Uso do Solo</h3>
        <Pie data={{
          labels: ['Área Agricultável', 'Área de Vegetação'],
          datasets: [{
            data: [
              data?.data.charts.landUsage.arableArea, 
              data?.data.charts.landUsage.vegetationArea
            ],
            backgroundColor: ['#4BC0C0', '#9966FF'],
          }]
        }} />
      </Box>

      <Box sx={{ width: 400 }}>
        <h3>Distribuição de Culturas</h3>
        <Pie data={{
          labels: data?.data.charts.byCrop.map((item: any) => item.name),
          datasets: [{
            data: data?.data.charts.byCrop.map((item: any) => item.count),
            backgroundColor: cropColors.slice(0, data?.data.charts.byCrop.length),
          }]
        }} />
      </Box>
    </Box>
  );
};