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
  Button
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { producersService } from '../../api/endpoints/producers';
import { ProducerForm } from './producersForm';
import { ConfirmationDialog } from '../global/confirmDialog';
import { Producer } from '../../types';


export const ProducersList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingProducer, setEditingProducer] = useState<Producer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [producerToDelete, setProducerToDelete] = useState<number | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const { data: producers, isLoading } = useQuery({
    queryKey: ['producers', page, rowsPerPage],
    queryFn: async () => {
      const response = await producersService.getProducers({
        page: page + 1,
        limit: rowsPerPage
      });
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => producersService.deleteProducer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['producers'] });
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
        <Typography variant="h5">Lista de Produtores</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setFormModalOpen(true)}
        >
          Novo Produtor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CPF/CNPJ</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {producers?.map((producer: Producer) => (
              <TableRow key={producer.id}>
                <TableCell>{producer.documentNumber}</TableCell>
                <TableCell>{producer.producerName}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => setEditingProducer(producer)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => {
                      setProducerToDelete(producer.id);
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
        count={producers?.length|| 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {editingProducer && (
        <ProducerForm
          initialData={editingProducer}
          onSuccess={() => {
            setEditingProducer(null);
            queryClient.invalidateQueries({ queryKey: ['producers'] });
          }}
          onCancel={() => setEditingProducer(null)}
          isModal={true}
        />
      )}

      {formModalOpen && (
        <ProducerForm
          onSuccess={() => {
            setFormModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['producers'] });
          }}
          onCancel={() => setFormModalOpen(false)}
          isModal={true}
        />
      )}

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este produtor?"
        onConfirm={() => producerToDelete && handleDelete(producerToDelete)}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};