import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ResponsiveDrawer from './drawer/m_drawer_test.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Page, Pages, lists } from './pages.tsx';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function getPages(Item:Page):JSX.Element[]{
    let ReturnItem:JSX.Element[] = []

    if (Item.subPages){
        for(let i = 0;i < Item.subPages.length;i++){
            ReturnItem.concat(getPages(Item.subPages[i]))
        }
        return ReturnItem
    }else{
        return [getRoute(Item)]
    }


    function getRoute(Item:Page):JSX.Element{
        return (
            <Route key={Item.text} path={Item.href} element={Item.element} />
        )
    }
}



ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>

        <div>
            <BrowserRouter>

                <ResponsiveDrawer></ResponsiveDrawer>
                <div className='main'>

                    <Routes>
                        {lists.map((Item:Page) => {
                            return getPages(Item)
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

        </ThemeProvider>
    </React.StrictMode>,
);
