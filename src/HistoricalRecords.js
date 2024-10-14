import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { jsPDF } from 'jspdf';

function HistoricalRecords() {
  const historicalData = JSON.parse(localStorage.getItem('historicalData')) || [];

  // Mostrar solo los últimos 20 registros
  const recentData = historicalData.slice(-20);

  // Función para generar y descargar el PDF con todos los registros
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Registros Históricos', 10, 10);
    
    // Agregar datos en el PDF
    let yOffset = 20; // Control de posición vertical en el PDF
    historicalData.forEach((record, index) => {
      doc.text(
        `${index + 1}. Fecha y Hora: ${record.time} - Parámetro: ${record.parameter} - Valor: ${record.value}`,
        10,
        yOffset
      );
      yOffset += 10; // Espacio entre líneas
    });

    doc.save('registros_historicos.pdf'); // Descarga del PDF
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Registros Históricos
      </Typography>
      
      <Button variant="contained" color="primary" onClick={downloadPDF} style={{ marginBottom: '20px' }}>
        Descargar todos los registros en PDF
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Fecha y Hora</strong></TableCell>
              <TableCell><strong>Parámetro</strong></TableCell>
              <TableCell><strong>Valor</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentData.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.time}</TableCell>
                <TableCell>{record.parameter}</TableCell>
                <TableCell>{record.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default HistoricalRecords;
