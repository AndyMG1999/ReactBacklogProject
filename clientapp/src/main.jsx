import '@mantine/core/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import { mainTheme } from './themes/themes.js';

createRoot(document.getElementById('root')).render(
  <MantineProvider theme={mainTheme} >
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
)
