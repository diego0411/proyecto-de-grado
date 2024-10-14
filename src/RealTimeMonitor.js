import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import HeartRateChart from './HeartRateChart';
import TemperatureChart from './TemperatureChart';
import OxygenChart from './OxygenChart';

const RealTimeMonitor = () => {
  const [userParameters, setUserParameters] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([]); // Estado para almacenar las últimas alertas

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')); // Ajusta según como guardes tus datos
    if (userData) {
      setUserParameters({
        heartRateMin: userData.heartRateMin,
        heartRateMax: userData.heartRateMax,
        temperatureMin: userData.temperatureMin,
        temperatureMax: userData.temperatureMax,
        oxygenMin: userData.oxygenMin,
        oxygenMax: userData.oxygenMax,
      });
    }

    // Cargar las últimas alertas desde el localStorage
    const rawAlerts = localStorage.getItem('alerts') || '[]';
    try {
      const parsedAlerts = JSON.parse(rawAlerts);
      // Tomar solo las últimas 3 alertas y aquellas que estén pendientes
      const filteredAlerts = parsedAlerts
        .filter(alert => alert.status === 'Pendiente') // Filtrar solo las pendientes
        .slice(-3); // Obtener las últimas 3
      setRecentAlerts(filteredAlerts);
    } catch (error) {
      console.error("Error al parsear las alertas:", error);
    }
  }, []);

  return (
    <div>
      <h2>Monitoreo en tiempo real</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <HeartRateChart userParameters={userParameters} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TemperatureChart userParameters={userParameters} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <OxygenChart userParameters={userParameters} />
        </Grid>
      </Grid>

      {/* Mostrar las últimas 3 alertas */}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>Últimas Alertas Disparadas</Typography>
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert, index) => (
            <div key={index}>
              <Typography variant="body1">
                {new Date(alert.timestamp).toLocaleString()}: {alert.type} - Estado: {alert.status}
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="body1">No hay alertas pendientes.</Typography>
        )}
      </Paper>
    </div>
  );
};

export default RealTimeMonitor;
