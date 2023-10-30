import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ResponsiveDrawer from './drawer/m_drawer_test.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home.tsx';
import About from './pages/About.tsx';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReturnEmpty from './pages/ReturnEmptyPage.tsx';

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
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} /> {/*追加*/}
                        <Route path="/users" element={<ReturnEmpty text="Users" />} /> {/*追加*/}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

        </ThemeProvider>
    </React.StrictMode>,
);
