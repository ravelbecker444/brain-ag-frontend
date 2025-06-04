import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  TablePagination,
  Button,
  Chip
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Crop } from '../../types';
import { cropsService } from '../../api/endpoints/crops';
import { CropForm } from './cropForm';
import { ConfirmationDialog } from '../global/confirmDialog';


export const CropsList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cropToDelete, setCropToDelete] = useState<number | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const { data: crops, isLoading } = useQuery({
    queryKey: ['crops', page, rowsPerPage],
    queryFn: async () => {
      const response = await cropsService.getCrops({
        page: page + 1,
        limit: rowsPerPage
      });
      return response.data;
    },
  }
  
  );

  const deleteMutation = useMutation({
    mutationFn: (id: number) => cropsService.deleteCrop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crops'] });
    }
  });

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Lista de Culturas</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setFormModalOpen(true)}
        >
          Nova Cultura
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Safra</TableCell>
              <TableCell>Área Plantada</TableCell>
              <TableCell>Fazenda</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crops?.map((crop: Crop) => (
              <TableRow key={crop.id}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>
                  <Chip label={crop.harvest} color="info" />
                </TableCell>
                <TableCell>{crop.plantedAreaHectares} ha</TableCell>
                <TableCell>{crop?.farm?.farmName}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => setEditingCrop(crop)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => {
                      setCropToDelete(crop.id);
                      setDeleteDialogOpen(true);
                    }}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={crops?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {editingCrop && (
        <CropForm
          initialData={editingCrop}
          onSuccess={() => {
            setEditingCrop(null);
            queryClient.invalidateQueries({ queryKey: ['crops'] });
          }}
          onCancel={() => setEditingCrop(null)}
          open={Boolean(editingCrop)}
        />
      )}

      {formModalOpen && (
        <CropForm
          onSuccess={() => {
            setFormModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['crops'] });
          }}
          onCancel={() => setFormModalOpen(false)}
          open={formModalOpen}
        />
      )}

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta cultura?"
        onConfirm={() => cropToDelete && handleDelete(cropToDelete)}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};