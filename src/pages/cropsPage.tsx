import { Box, Typography } from '@mui/material';
import { CropsList } from '../components/crops/cropList';

export const CropsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestão de Culturas
      </Typography>
      <CropsList />
    </Box>
  );
};