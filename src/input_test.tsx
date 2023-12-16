import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Page, lists } from "./reception/Recep_page.tsx";
import ResponsiveAppBar from "./appbar/Appbar.tsx";
import "./App.css";
import Error404 from "./pages/other/error/Error404.tsx";
// import BreadCrumb from "./reception/components/BreadCrumb.tsx";

const darkTheme = createTheme({
    palette: {
        //ライトモードで
        mode: "light",
    },
});

// function getPages(Item: Page): JSX.Element[] {
//     const ReturnItem = [
//         getRoute(Item),
//         ...(Item.subPages?.flatMap((page) => getPages(page)) ?? []),
//     ];
//     return ReturnItem;

//     function getRoute(Item: Page): JSX.Element {
//         return (
//             <>
//                 <Route
//                     key={Item.text}
//                     path={Item.href}
//                     element={
//                         <>
//                             <BreadCrumb></BreadCrumb>

//                             {Item.element}
//                         </>
//                     }
//                 />
//             </>
//         );
//     }
// }


// function getPagesv2(Item: Page): JSX.Element {

//     return (
//         <Route key={Item.text} path={Item.href} element={Item.element}>
//             {Item.subPages?.map((page) => getPagesChild(page))}
//         </Route>
//     )


// }

function getPagesChild(Item: Page): JSX.Element {
    return (
       
            <Route path={Item.href} key={Item.href}>
                <Route index element={
                    <>
                    {/* <BreadCrumb/> */}
                    {Item.element}
                    </>
                    } />
                {Item.subPages?.map((page) => getPagesChild(page))}
            </Route>
       
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ResponsiveAppBar></ResponsiveAppBar>

        <div>
            <BrowserRouter>
                <div className="main">
                    <Routes>
                        {getPagesChild(lists[0])}
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
