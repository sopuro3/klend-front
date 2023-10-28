import React from 'react';
import RegisterData from '../components/RegisterData';
import ListData from '../components/ListData';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

function DrawerHTML() {
    return (
        <div className="App">
            <Router>
                <Route path="/" Component={ListData} />
                <Route path="/list" Component={ListData} />
                <Route path="/add" Component={RegisterData} />
            </Router>
        </div>
    );
}

export default DrawerHTML