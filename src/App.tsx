import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { ProfilePage } from './pages';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ProfilePage />
    </ThemeProvider>
  );
}

export default App;
