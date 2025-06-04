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
import { Farm } from '../../types';
import { farmsService } from '../../api/endpoints/farms';
import { FarmForm } from './farmsForm';
import { ConfirmationDialog } from '../global/confirmDialog';

export const FarmsList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [farmToDelete, setFarmToDelete] = useState<number | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const { data: farms, isLoading } = useQuery({
    queryKey: ['farms', page, rowsPerPage],
    queryFn: () => farmsService.getFarms({
      page: page + 1,
      limit: rowsPerPage
    })
  });

  const deleteMutation = useMutation(
    {
      mutationFn: (id: number) => farmsService.deleteFarm(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['farms'] });
      }
    }
  );

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
        <Typography variant="h5">Lista de Fazendas</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setFormModalOpen(true)}
        >
          Nova Fazenda
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Área Total</TableCell>
              <TableCell>Produtor</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farms?.data.map((farm: Farm) => (
              <TableRow key={farm.id}>
                <TableCell>{farm.farmName}</TableCell>
                <TableCell>
                  {farm.city}/{farm.state}
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column">
                    <span>Total: {farm.totalAreaHectares} ha</span>
                    <Box display="flex" gap={1} mt={0.5}>
                      <Chip 
                        label={`Agric: ${farm.arableAreaHectares} ha`} 
                        size="small" 
                        color="primary" 
                      />
                      <Chip 
                        label={`Veg: ${farm.vegetationAreaHectares} ha`} 
                        size="small" 
                        color="secondary" 
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{farm.producer.producerName}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => setEditingFarm(farm)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => {
                      setFarmToDelete(farm.id);
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
        count={farms?.data.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {editingFarm && (
        <FarmForm
          initialData={editingFarm}
          onSuccess={() => {
            setEditingFarm(null);
            queryClient.invalidateQueries({ queryKey: ['farms'] });
          }}
          onCancel={() => setEditingFarm(null)}
          open={Boolean(editingFarm)}
        />
      )}

      {formModalOpen && (
        <FarmForm
          onSuccess={() => {
            setFormModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['farms'] });
          }}
          onCancel={() => setFormModalOpen(false)}
          open={formModalOpen}
        />
      )}

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta fazenda?"
        onConfirm={() => farmToDelete && handleDelete(farmToDelete)}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};