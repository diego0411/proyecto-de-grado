import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
import emailjs from 'emailjs-com';

const SimulateAlerts = () => {
  const [parameter, setParameter] = useState('');
  const [alertData, setAlertData] = useState([]);
  const [userData, setUserData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleParameterChange = (event) => {
    setParameter(event.target.value);
  };

  const generateAlert = () => {
    if (!parameter) {
      alert('Por favor, selecciona un parámetro para simular.');
      return;
    }

    let value;
    switch (parameter) {
      case 'temperatura':
        value = (36 + Math.random() * 2).toFixed(1);
        break;
      case 'oxigeno':
        value = (95 + Math.random() * 5).toFixed(1);
        break;
      case 'presion':
        value = (60 + Math.random() * 40).toFixed(0);
        break;
      default:
        return;
    }

    const alertTimestamp = new Date().toISOString();
    const alertMessage = {
      timestamp: alertTimestamp,
      type: parameter,
      value: value,
      status: 'No atendida',
    };

    setAlertData((prev) => [...prev, alertMessage]);
    localStorage.setItem('alerts', JSON.stringify([...alertData, alertMessage]));

    setSnackbarMessage(`Alerta: ${parameter} ha alcanzado un valor crítico de ${value}`);
    setSnackbarOpen(true);

    sendEmail(parameter, value);
  };

  const sendEmail = (parameter, value) => {
    if (!userData.email) {
      console.error('No se encontró el correo electrónico del usuario.');
      return;
    }

    const templateParams = {
      to_email: userData.email,
      parameter: parameter,
      value: value,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      userName: userData.name,
    };

    console.log('Datos del correo a enviar:', templateParams); // Mensaje de depuración

    emailjs.send('service_9olngsr', 'template_pww5zr7', templateParams, 'FIF9OTXuWfunPHIvn')
      .then((response) => {
        console.log('Correo enviado con éxito!', response.status, response.text);
      }, (err) => {
        console.error('Error al enviar correo:', err);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h6" gutterBottom>Simular Alertas</Typography>
      <FormControl fullWidth variant="outlined">
        <Select value={parameter} onChange={handleParameterChange} displayEmpty>
          <MenuItem value="">
            <em>Seleccionar parámetro</em>
          </MenuItem>
          <MenuItem value="temperatura">Temperatura Corporal</MenuItem>
          <MenuItem value="oxigeno">Oxigenación en Sangre</MenuItem>
          <MenuItem value="presion">Presión Arterial</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="secondary" onClick={generateAlert} style={{ marginTop: '10px' }}>
        Simular
      </Button>
      <div style={{ marginTop: '20px' }}>
        {alertData.map((alert, index) => (
          <Typography key={index}>
            Alerta: {alert.type} ha alcanzado un valor crítico de {alert.value}.
          </Typography>
        ))}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ fontSize: '1.5rem', padding: '20px', borderRadius: '8px' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SimulateAlerts;
