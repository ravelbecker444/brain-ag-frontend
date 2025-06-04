import { Box, Typography } from '@mui/material';
import { FarmsList } from '../components/farms/farmsList';

export const FarmsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestão de Fazendas
      </Typography>
      <FarmsList />
    </Box>
  );
};