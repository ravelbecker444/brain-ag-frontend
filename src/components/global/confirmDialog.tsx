import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm} color="error">Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};