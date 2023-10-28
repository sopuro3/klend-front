import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ResponsiveDrawer from './m_drawer_test.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home.tsx';
import About from './pages/about.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ResponsiveDrawer></ResponsiveDrawer>
        <App id="1" />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} /> {/*追加*/}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
