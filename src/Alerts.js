import React, { useEffect, useState } from 'react';  
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  TextField,
} from '@mui/material'; // Importamos componentes de Material UI

function Alerts() {
  const [alerts, setAlerts] = useState([]); // Almacena las alertas
  const [historicalAlerts, setHistoricalAlerts] = useState([]); // Almacena las alertas históricas
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico

  // Evitar alertas no simuladas y cargar desde localStorage solo si es necesario
  useEffect(() => {
    const rawAlerts = localStorage.getItem('alerts') || '[]'; // Cargar datos o establecer como vacío
    try {
      const parsedAlerts = JSON.parse(rawAlerts); // Intentar parsear las alertas
      if (Array.isArray(parsedAlerts) && parsedAlerts.length > 0) {
        setAlerts(parsedAlerts); // Guardar alertas en el estado solo si es un array válido
      }
    } catch (error) {
      console.error("Error al parsear las alertas:", error);
    }

    const rawHistoricalAlerts = localStorage.getItem('historicalAlerts') || '[]'; // Cargar el historial de alertas
    try {
      const parsedHistoricalAlerts = JSON.parse(rawHistoricalAlerts);
      if (Array.isArray(parsedHistoricalAlerts) && parsedHistoricalAlerts.length > 0) {
        setHistoricalAlerts(parsedHistoricalAlerts);
      }
    } catch (error) {
      console.error("Error al parsear las alertas históricas:", error);
    }
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  // Manejar marcar alerta como atendida
  const handleMarkAsHandled = (alertToHandle) => {
    const updatedAlerts = alerts.filter((alert) => alert !== alertToHandle); // Remover de la lista de alertas
    const handledAlert = { ...alertToHandle, status: 'Atendida' }; // Cambiar estado de la alerta

    setAlerts(updatedAlerts); // Actualizar la lista de alertas no atendidas
    setHistoricalAlerts((prevHistorical) => [...prevHistorical, handledAlert]); // Agregar al historial

    // Actualizar el localStorage
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
    localStorage.setItem('historicalAlerts', JSON.stringify([...historicalAlerts, handledAlert]));
  };

  // Manejar eliminación de todas las alertas
  const handleDeleteAllAlerts = () => {
    setAlerts([]); // Vaciar la lista de alertas
    localStorage.setItem('alerts', JSON.stringify([])); // Vaciar también en el localStorage
  };

  // Manejar eliminación de alerta específica del historial
  const handleDeleteAlert = (alertToDelete) => {
    const updatedHistoricalAlerts = historicalAlerts.filter(alert => alert !== alertToDelete); // Filtrar alerta a eliminar
    setHistoricalAlerts(updatedHistoricalAlerts); // Actualizar el estado del historial
    localStorage.setItem('historicalAlerts', JSON.stringify(updatedHistoricalAlerts)); // Actualizar localStorage
  };

  // Manejar cambio de email
  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Actualiza el estado del correo electrónico
  };

  // Enviar alertas por email
  const handleSendEmail = () => {
    console.log(`Enviando alertas a: ${email}`);
    alert(`Alertas enviadas a ${email}`);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h4" gutterBottom align="center">Gestión de Alertas y Notificaciones</Typography>
      
      <Typography variant="h6" gutterBottom>Lista de Alertas</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo de Alerta</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(alert.timestamp).toLocaleDateString()} {new Date(alert.timestamp).toLocaleTimeString()}</TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleMarkAsHandled(alert)} // Lógica para marcar la alerta como atendida
                  >
                    Marcar como Atendida
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: '20px' }}
        onClick={handleDeleteAllAlerts} // Lógica para eliminar todas las alertas
      >
        Eliminar Todas las Alertas
      </Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Historial de Alertas</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo de Alerta</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalAlerts.map((alert, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(alert.timestamp).toLocaleDateString()} {new Date(alert.timestamp).toLocaleTimeString()}</TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteAlert(alert)} // Lógica para eliminar la alerta del historial
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Correo electrónico"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSendEmail}>
            Enviar Alertas por Correo
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Alerts;
