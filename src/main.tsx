import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ResponsiveDrawer from './drawer/m_drawer_test.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lists } from './pages.tsx';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});





ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>

        <div>
            <BrowserRouter>

                <ResponsiveDrawer></ResponsiveDrawer>
                <div className='main'>

                    <Routes>
                        {lists.map((list) => (
                            <Route key={list.text} path={list.href} element={list.element} />
                        
                        ))}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

        </ThemeProvider>
    </React.StrictMode>,
);
