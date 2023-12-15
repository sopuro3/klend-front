import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ResponsiveDrawer from "./drawer/drawer.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Page, lists } from "./pages.tsx";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
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
            <Route key={Item.text} path={Item.href} element={Item.element} />
        );
    }
}




ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <div>
            <BrowserRouter>
                <ResponsiveDrawer></ResponsiveDrawer>
                <div className="main">
                    <Routes>
                        {lists.map((Item: Page) => {
                            return getPages(Item);
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
        </ThemeProvider>
    </StrictMode>,
);
