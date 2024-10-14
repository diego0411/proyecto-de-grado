import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Paper, Typography, Grid } from '@mui/material';

const UserHealthData = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    heartRate: '',
    temperature: '',
    oxygen: '',
    heartRateMin: '',
    heartRateMax: '',
    temperatureMin: '',
    temperatureMax: '',
    oxygenMin: '',
    oxygenMax: '',
    email: '' // Nuevo campo para el correo electrónico
  });

  // Cargar los datos desde localStorage al iniciar el componente
  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    if (savedUserData) {
      setUserData(savedUserData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    // Guardar los datos en localStorage cada vez que cambian
    localStorage.setItem('userData', JSON.stringify({ ...userData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Datos guardados con éxito!');
  };

  const handleLoadData = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData(storedData);
    } else {
      alert('No se encontraron datos para el usuario.');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Configuración de Perfil y Preferencias</Typography>
      <form onSubmit={handleSubmit}>
        {/* Sección de Información Personal */}
        <Typography variant="h6" gutterBottom>Información Personal</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre Completo"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="age"
              type="number"
              value={userData.age}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sexo"
              name="gender"
              select
              value={userData.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Sección de Datos de Salud Específicos */}
        <Typography variant="h6" gutterBottom>Datos de Salud Específicos</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Frecuencia Cardíaca (BPM)"
              name="heartRate"
              type="number"
              value={userData.heartRate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Temperatura Corporal (°C)"
              name="temperature"
              type="number"
              value={userData.temperature}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Oxígeno en Sangre (%)"
              name="oxygen"
              type="number"
              value={userData.oxygen}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Sección de Ajustes de Umbrales */}
        <Typography variant="h6" gutterBottom>Ajustes de Umbrales</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Umbral Mínimo de Frecuencia Cardíaca (BPM)"
              name="heartRateMin"
              type="number"
              value={userData.heartRateMin}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Umbral Máximo de Frecuencia Cardíaca (BPM)"
              name="heartRateMax"
              type="number"
              value={userData.heartRateMax}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Umbral Mínimo de Temperatura (°C)"
              name="temperatureMin"
              type="number"
              value={userData.temperatureMin}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Umbral Máximo de Temperatura (°C)"
              name="temperatureMax"
              type="number"
              value={userData.temperatureMax}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Umbral Mínimo de Oxígeno (%)"
              name="oxygenMin"
              type="number"
              value={userData.oxygenMin}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Umbral Máximo de Oxígeno (%)"
              name="oxygenMax"
              type="number"
              value={userData.oxygenMax}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        {/* Campo de correo electrónico */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Guardar Configuración</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleLoadData} style={{ marginLeft: '10px' }}>
            Cargar Datos
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default UserHealthData;
