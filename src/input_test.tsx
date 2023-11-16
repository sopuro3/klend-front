import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Page, lists } from './reception/Recep_page.tsx';
import ResponsiveAppBar from './appbar/Appbar.tsx';
import './App.css';
import BreadCrumb from './reception/components/BreadCrumb.tsx';
import Error404 from './pages/other/error/Error404.tsx';

const darkTheme = createTheme({
    palette: {
        //ライトモードで
        mode: 'light',
    },
});

function getPages(Item: Page): JSX.Element[] {
    const ReturnItem = [
        getRoute(Item),
        ...(Item.subPages?.flatMap((page) => getPages(page)) ?? []),
    ];
    return ReturnItem;

    function getRoute(Item: Page): JSX.Element {
        return (
            <>
                <Route
                    key={Item.text}
                    path={Item.href}
                    element={
                        <>
                            <BreadCrumb></BreadCrumb>

                            {Item.element}
                        </>
                    }
                />
            </>
        );
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ResponsiveAppBar></ResponsiveAppBar>

        <div>
            <BrowserRouter>
                <div className="main">
                    <Routes>
                        {lists.map((Item: Page) => {
                            return getPages(Item);
                        })}

                        <Route
                            path="*"
                            element={Error404({ pathname: location.pathname })}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
        </ThemeProvider>
    </StrictMode>,
);
