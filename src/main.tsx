import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Page, lists } from "./reception/Recep_page.tsx";
import ResponsiveAppBar from "./appbar/Appbar.tsx";
import "./App.css";
import BreadCrumb from "./reception/components/BreadCrumb.tsx";
import Error404 from "./pages/other/error/Error404.tsx";
//@ts-expect-error:TS7017
import App from "@/dashboard/App.jsx";
//@ts-expect-error:TS7016
import { store } from "@/dashboard/store";
import "@/dashboard/assets/scss/style.scss";
import config from "@/dashboard/config";

//forstaffの時はbodyにクラスを適用することでCSSの切り替えに対応
// import "./index.css";

//index.cssの内容を文字として受け取る

const darkTheme = createTheme({
    palette: {
        //ライトモードで
        mode: "light",
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

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {location.pathname.includes("/dashboard") ? (
            <ForStaff />
        ) : (
            <ForGeneral />
        )}

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
        </ThemeProvider>
    </StrictMode>,
);

function ForGeneral() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <ResponsiveAppBar></ResponsiveAppBar>

                    <div className="main">
                        <Routes>
                            {lists.map((Item: Page) => {
                                return getPages(Item);
                            })}

                            <Route
                                path="*"
                                element={Error404({
                                    pathname: location.pathname,
                                })}
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}

function ForStaff() {
    //bodyにforstaffクラスを追加する
    document.body.classList.add("forstaff");

    return (
        <Provider store={store}>
            {/* index.cssをインポートする */}
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </Provider>
    );
}
