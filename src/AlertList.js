import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const AlertList = ({ alerts }) => {
  return (
    <Paper style={{ marginTop: '20px', padding: '10px' }}>
      <Typography variant="h6">Últimas Alertas</Typography>
      <List>
        {alerts.length === 0 ? (
          <ListItem>
            <ListItemText primary="No hay alertas recientes." />
          </ListItem>
        ) : (
          alerts.map((alert, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${alert.time}: ${alert.message}`} />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default AlertList;
