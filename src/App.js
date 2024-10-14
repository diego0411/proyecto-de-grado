// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import RealTimeMonitor from './RealTimeMonitor';
import HistoricalRecords from './HistoricalRecords';
import Alerts from './Alerts';
import SimulateAlerts from './SimulateAlerts'; // Importamos el nuevo componente
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './styles.css'; 
import UserHealthData from './UserHealthData';

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Monitoreo de Salud
          </Typography>
          <Button color="inherit" component={Link} to="/">Monitor en Tiempo Real</Button>
          <Button color="inherit" component={Link} to="/historical-records">Registros Históricos</Button>
          <Button color="inherit" component={Link} to="/UserHealthData">Perfil</Button>
          <Button color="inherit" component={Link} to="/alerts">Alertas</Button>
          <Button color="inherit" component={Link} to="/simulate-alerts">Simular</Button> {/* Botón de Simular */}
        </Toolbar>
      </AppBar>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<RealTimeMonitor />} />
          <Route path="/historical-records" element={<HistoricalRecords />} />
          <Route path="/UserHealthData" element={<UserHealthData />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/simulate-alerts" element={<SimulateAlerts />} /> {/* Ruta para Simular */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
