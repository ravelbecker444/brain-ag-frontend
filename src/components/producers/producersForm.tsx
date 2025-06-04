import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import { producersService } from '../../api/endpoints/producers';
import { Producer } from '../../types';

interface ProducerFormProps {
  initialData?: Producer | null;
  onSuccess: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const ProducerForm = ({ 
  initialData, 
  onSuccess, 
  onCancel, 
  isModal = false 
}: ProducerFormProps) => {
  const [formData, setFormData] = useState({
    documentNumber: '',
    producerName: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        documentNumber: initialData.documentNumber,
        producerName: initialData.producerName
      });
    } else {
      setFormData({
        documentNumber: '',
        producerName: ''
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (initialData) {
        await producersService.updateProducer(initialData.id, formData);
      } else {
        await producersService.createProducer(formData);
      }
      onSuccess();
      if (!initialData && !isModal) {
        setFormData({ documentNumber: '', producerName: '' });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar produtor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        
        <TextField
          label="CPF/CNPJ"
          value={formData.documentNumber}
          onChange={(e) => setFormData({...formData, documentNumber: e.target.value})}
          required
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Nome do Produtor"
          value={formData.producerName}
          onChange={(e) => setFormData({...formData, producerName: e.target.value})}
          required
          fullWidth
          margin="normal"
        />
        
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button 
              onClick={onCancel} 
              variant="outlined"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : initialData ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </Stack>
      </Stack>
    </form>
  );

  if (isModal) {
    return (
      <Dialog open={true} onClose={onCancel} fullWidth maxWidth="sm">
        <DialogTitle>
          {initialData ? 'Editar Produtor' : 'Cadastrar Novo Produtor'}
        </DialogTitle>
        <DialogContent>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Stack spacing={3} sx={{ mb: 4 }}>
      <Typography variant="h6">
        {initialData ? 'Editar Produtor' : 'Cadastrar Novo Produtor'}
      </Typography>
      {formContent}
    </Stack>
  );
};