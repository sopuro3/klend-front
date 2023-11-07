import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Page, lists } from './reception/Recep_page.tsx';
import ResponsiveAppBar from './appbar/Appbar.tsx';
import './App.css'
import { Breadcrumbs, Link, Typography } from '@mui/material';


const darkTheme = createTheme({
    palette: {
        //ライトモードで
        mode: 'light',
    },
});

function getPages(Item: Page): JSX.Element[] {
    const ReturnItem = [getRoute(Item), ...(Item.subPages?.flatMap((page) => getPages(page)) ?? [])];
    return ReturnItem;

    function getRoute(Item: Page): JSX.Element {
        return <Route key={Item.text} path={Item.href} element={Item.element} />;
    }
}

import { Link as RouterLink } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById("root")!).render(


    <React.StrictMode>
        <ResponsiveAppBar></ResponsiveAppBar>

        <div>

            <BrowserRouter>

                <div className='main'>
                    <Breadcrumbs aria-label="breadcrumb" separator=">">
                        <Link component={RouterLink} underline="hover" color="inherit" to="/">
                            個数入力ホーム
                        </Link>
                        <Link
                            component={RouterLink}
                            underline="hover"
                            color="inherit"
                            to="/material-ui/getting-started/installation/"
                        >
                            個数記入
                        </Link>
                        <Typography color="text.primary">
                            数量確認
                        </Typography>
                    </Breadcrumbs>
                    <Routes>
                        {lists.map((Item: Page) => {
                            console.log(getPages(Item))
                            return getPages(Item)
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

        </ThemeProvider>
    </React.StrictMode>

);


