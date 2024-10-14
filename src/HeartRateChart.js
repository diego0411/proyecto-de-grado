import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material'; // Importamos Material UI

const HeartRateChart = ({ userParameters }) => {
  const [heartRate, setHeartRate] = useState(0);
  const [boxColor, setBoxColor] = useState('green'); // Color inicial como verde

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeartRate = Math.floor(60 + Math.random() * 40); // Simular una frecuencia cardíaca
      setHeartRate(newHeartRate);

      // Verificar umbrales y cambiar el color
      if (userParameters) {
        const { heartRateMin, heartRateMax } = userParameters;
        if (newHeartRate < heartRateMin || newHeartRate > heartRateMax) {
          setBoxColor('red'); // Rojo si está fuera de los límites
        } else if (newHeartRate > heartRateMax - 10 || newHeartRate < heartRateMin + 10) {
          setBoxColor('yellow'); // Amarillo si está cerca del límite
        } else {
          setBoxColor('green'); // Verde si está dentro de los límites
        }

        // Almacenar la alerta si es necesario
        if (newHeartRate < heartRateMin || newHeartRate > heartRateMax) {
          const alertMessage = `Alerta: Frecuencia cardíaca ${newHeartRate} en ${new Date().toLocaleString()}`;
          const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
          alerts.push(alertMessage);
          localStorage.setItem('alerts', JSON.stringify(alerts));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userParameters]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}> {/* Fondo blanco y sombra */}
      <Typography variant="h6" gutterBottom>Frecuencia Cardíaca</Typography> {/* Título con Material UI */}
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
        {heartRate} BPM {/* Mostrar el valor de la frecuencia cardíaca */}
      </div>
    </Paper>
  );
};

export default HeartRateChart;
