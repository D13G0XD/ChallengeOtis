import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vendas from './pages/Vendas';
import Planejamento from './pages/Planejamento';
import Fabricacao from './pages/Fabricacao';
import Instalacao from './pages/Instalacao';
import InstallationDetail from './pages/InstallationDetail';
import Qualidade from './pages/Qualidade';
import PortalCliente from './pages/PortalCliente';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rotas principais com layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="planejamento" element={<Planejamento />} />
            <Route path="fabricacao" element={<Fabricacao />} />
            <Route path="instalacao" element={<Instalacao />} />
            <Route path="instalacao/:id" element={<InstallationDetail />} />
            <Route path="qualidade" element={<Qualidade />} />
          </Route>
          
          {/* Portal do cliente - sem layout principal */}
          <Route path="/cliente/*" element={<PortalCliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
