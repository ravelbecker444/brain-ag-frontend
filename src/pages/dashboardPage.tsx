import { Box, Typography } from '@mui/material';
import { DashboardCharts } from '../components/dashboard/dashboardCharts';

export const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <DashboardCharts />
    </Box>
  );
};