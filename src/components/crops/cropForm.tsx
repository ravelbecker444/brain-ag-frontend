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
import { useQuery } from '@tanstack/react-query';
import { cropsService } from '../../api/endpoints/crops';
import { farmsService } from '../../api/endpoints/farms';
import { Crop } from '../../types';

interface CropFormProps {
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: Crop;
}

export const CropForm = ({ open, onSuccess, onCancel, initialData }: CropFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    harvest: '',
    plantedAreaHectares: '',
    farmId: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        harvest: initialData.harvest,
        plantedAreaHectares: initialData.plantedAreaHectares.toString(),
        farmId: initialData.farm.id.toString()
      });
    } else if (!open) {
      setFormData({
        name: '',
        harvest: '',
        plantedAreaHectares: '',
        farmId: ''
      });
    }
  }, [initialData, open]);

  const { data: farms } = useQuery({
    queryKey: ['farms'],
    queryFn: () => farmsService.getFarms({
      page: 1,
      limit: 100 
    })
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cropPayload = {
        name: formData.name,
        harvest: formData.harvest,
        plantedAreaHectares: parseFloat(formData.plantedAreaHectares),
        farmId: parseInt(formData.farmId)
      };

      if (initialData) {
        await cropsService.updateCrop(initialData.id, cropPayload);
      } else {
        await cropsService.createCrop(cropPayload);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving crop:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Editar Cultura' : 'Nova Cultura'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nome da Cultura"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Safra (ex: 2023)"
              value={formData.harvest}
              onChange={(e) => setFormData({ ...formData, harvest: e.target.value })}
              required
              fullWidth
            />

            <TextField
              label="Área Plantada (ha)"
              type="number"
              value={formData.plantedAreaHectares}
              onChange={(e) => setFormData({ ...formData, plantedAreaHectares: e.target.value })}
              required
              fullWidth
            />

            <TextField
              select
              label="Fazenda"
              value={formData.farmId}
              onChange={(e) => setFormData({ ...formData, farmId: e.target.value })}
              required
              fullWidth
            >
              {farms?.data.map((farm: any) => (
                <MenuItem key={farm.id} value={farm.id}>
                  {farm.farmName} ({farm.city}/{farm.state})
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
            {initialData ? 'Salvar' : 'Cadastrar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};