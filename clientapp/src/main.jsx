import '@mantine/core/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import { mainTheme } from './themes/themes.js';
import { BrowserRouter } from 'react-router';
import ApplicationContext from './contexts/ApplicationContext.jsx';

createRoot(document.getElementById('root')).render(
  <MantineProvider theme={mainTheme} >
    <StrictMode>
      <BrowserRouter>
        <ApplicationContext>
          <App />
        </ApplicationContext>
      </BrowserRouter>
    </StrictMode>
  </MantineProvider>
)
