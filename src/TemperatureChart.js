import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material'; // Importamos Material UI

const TemperatureChart = ({ userParameters }) => {
  const [temperature, setTemperature] = useState(0);
  const [boxColor, setBoxColor] = useState('green'); // Color inicial como verde

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = Math.floor(36 + Math.random() * 2); // Simular una temperatura corporal
      setTemperature(newTemperature);

      // Verificar umbrales y cambiar el color
      if (userParameters) {
        const { temperatureMin, temperatureMax } = userParameters;
        if (newTemperature < temperatureMin || newTemperature > temperatureMax) {
          setBoxColor('red'); // Rojo si está fuera de los límites
        } else if (newTemperature > temperatureMax - 0.5 || newTemperature < temperatureMin + 0.5) {
          setBoxColor('yellow'); // Amarillo si está cerca del límite
        } else {
          setBoxColor('green'); // Verde si está dentro de los límites
        }

        // Almacenar la alerta si es necesario
        if (newTemperature < temperatureMin || newTemperature > temperatureMax) {
          const alertMessage = `Alerta: Temperatura ${newTemperature}°C en ${new Date().toLocaleString()}`;
          const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
          alerts.push(alertMessage);
          localStorage.setItem('alerts', JSON.stringify(alerts));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userParameters]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h6" gutterBottom>Temperatura Corporal</Typography>
      <div
        style={{
          width: '200px', // Ancho del cuadro
          height: '100px', // Alto del cuadro
          backgroundColor: boxColor, // Color del cuadro
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          color: 'black', // Cambiado a negro para el texto
          borderRadius: '10px',
          margin: '0 auto', // Centrar el cuadro
        }}
      >
        {temperature}°C {/* Mostrar el valor de temperatura */}
      </div>
    </Paper>
  );
};

export default TemperatureChart;
