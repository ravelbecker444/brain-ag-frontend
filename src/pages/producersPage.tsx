import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProducersList } from '../components/producers/producersList';

export const ProducersPage = () => {
  const [refreshKey] = useState(0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Cadastro de Produtores
      </Typography>
      <ProducersList key={refreshKey} />
    </Box>
  );
};