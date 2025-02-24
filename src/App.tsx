import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ConcreteCalculator from './components/ConcreteCalculator';

// Define the maroon and white theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#800000', // Maroon color
      contrastText: '#fff', // White text
    },
    secondary: {
      main: '#ffffff', // White color
      contrastText: '#800000', // Maroon text
    },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9', // Light paper background
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#800000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ConcreteCalculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
