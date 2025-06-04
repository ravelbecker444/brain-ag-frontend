import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importe isso
import { DashboardPage } from './pages/dashboardPage';
import { ProducersPage } from './pages/producersPage';
import { Navigation } from './components/dashboard/navigation/navigation';
import { FarmsPage } from './pages/farmsPage';
import { CropsPage } from './pages/cropsPage';

// Crie uma instância do QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Adicione isso */}
      <Router>
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/producers" element={<ProducersPage />} />
            <Route path="/farms" element={<FarmsPage />} />
            <Route path="/crops" element={<CropsPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;