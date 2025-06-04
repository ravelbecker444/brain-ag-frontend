import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

export const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/producers">
          Produtores
        </Button>
        <Button color="inherit" component={Link} to="/farms">
          Fazendas
        </Button>
        <Button color="inherit" component={Link} to="/crops">
          Safras
        </Button>
      </Toolbar>
    </AppBar>
  );
};