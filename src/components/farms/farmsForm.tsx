import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions 
} from '@mui/material';
import { producersService } from '../../api/endpoints/producers';
import { farmsService } from '../../api/endpoints/farms';
import { useQuery } from '@tanstack/react-query';
import { Farm } from '../../types';

interface FarmFormProps {
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Farm;
}

export const FarmForm = ({ open, onSuccess, onCancel, initialData }: FarmFormProps) => {
  const [formData, setFormData] = useState({
    farmName: '',
    city: '',
    state: '',
    totalAreaHectares: '',
    arableAreaHectares: '',
    vegetationAreaHectares: '',
    producerId: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        farmName: initialData.farmName,
        city: initialData.city,
        state: initialData.state,
        totalAreaHectares: String(initialData.totalAreaHectares),
        arableAreaHectares: String(initialData.arableAreaHectares),
        vegetationAreaHectares: String(initialData.vegetationAreaHectares),
        producerId: String(initialData.producer.id)
      });
    } else if (!open) {
      // Reset form when modal closes for new farm
      setFormData({
        farmName: '',
        city: '',
        state: '',
        totalAreaHectares: '',
        arableAreaHectares: '',
        vegetationAreaHectares: '',
        producerId: ''
      });
    }
  }, [initialData, open]);

  const { data: producers } = useQuery({
    queryKey: ['producers'],
    queryFn: async () => {
      const response = await producersService.getProducers({
        page: 1,
        limit: 10
      });
      return response.data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const farmPayload = {
        farmName: formData.farmName,
        city: formData.city,
        state: formData.state,
        totalAreaHectares: parseFloat(formData.totalAreaHectares),
        arableAreaHectares: parseFloat(formData.arableAreaHectares),
        vegetationAreaHectares: parseFloat(formData.vegetationAreaHectares),
        producerId: parseInt(formData.producerId)
      };

      if (initialData) {
        await farmsService.updateFarm(initialData.id, farmPayload);
      } else {
        await farmsService.createFarm(farmPayload);
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar fazenda:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Editar Fazenda' : 'Nova Fazenda'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nome da Fazenda"
              value={formData.farmName}
              onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Cidade"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Estado"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Área Total (ha)"
              type="number"
              value={formData.totalAreaHectares}
              onChange={(e) => setFormData({ ...formData, totalAreaHectares: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Área Agricultável (ha)"
              type="number"
              value={formData.arableAreaHectares}
              onChange={(e) => setFormData({ ...formData, arableAreaHectares: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Área de Vegetação (ha)"
              type="number"
              value={formData.vegetationAreaHectares}
              onChange={(e) => setFormData({ ...formData, vegetationAreaHectares: e.target.value })}
              required
              fullWidth
            />

            <TextField
              select
              label="Produtor"
              value={formData.producerId}
              onChange={(e) => setFormData({ ...formData, producerId: e.target.value })}
              required
              fullWidth
            >
              {producers?.map((producer: any) => (
                <MenuItem key={producer.id} value={producer.id}>
                  {producer.producerName} ({producer.documentNumber})
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};