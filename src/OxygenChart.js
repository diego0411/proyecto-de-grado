import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material'; // Importamos Material UI

const OxygenChart = ({ userParameters }) => {
  const [oxygen, setOxygen] = useState(0);
  const [boxColor, setBoxColor] = useState('green'); // Color inicial como verde

  useEffect(() => {
    const interval = setInterval(() => {
      const newOxygen = Math.floor(95 + Math.random() * 5); // Simular un nivel de oxígeno
      setOxygen(newOxygen);

      // Verificar umbrales y cambiar el color
      if (userParameters) {
        const { oxygenMin, oxygenMax } = userParameters;
        if (newOxygen < oxygenMin || newOxygen > oxygenMax) {
          setBoxColor('red'); // Rojo si está fuera de los límites
        } else if (newOxygen > oxygenMax - 1 || newOxygen < oxygenMin + 1) {
          setBoxColor('yellow'); // Amarillo si está cerca del límite
        } else {
          setBoxColor('green'); // Verde si está dentro de los límites
        }

        // Almacenar la alerta si es necesario
        if (newOxygen < oxygenMin || newOxygen > oxygenMax) {
          const alertMessage = `Alerta: Oxígeno ${newOxygen}% en ${new Date().toLocaleString()}`;
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
      <Typography variant="h6" gutterBottom>Oxígeno en Sangre</Typography>
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
        {oxygen}% {/* Mostrar el valor de oxígeno */}
      </div>
    </Paper>
  );
};

export default OxygenChart;
