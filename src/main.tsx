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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//forstaffの時はbodyにクラスを適用することでCSSの切り替えに対応
// import "./index.css";

//index.cssの内容を文字として受け取る
const darkTheme = createTheme({
    palette: {
        //ライトモードで
        mode: "light",
    },
});

(function () {
    const // 入力受付時間（1.5秒）
        wait = 1500,
        command = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
        length = command.length;
    let // standby = false の時は入力を受け付けない
        standby = true,
        // コマンドのキーコード
        index = 0;

    //timerはsetTimeoutの戻り値
    let timer = 0;

    document.addEventListener("keydown", function (ev) {
        // タイマーのリセット
        clearTimeout(timer);

        // コマンドの確認
        if (standby && ev.keyCode === command[index]) {
            index++;

            if (index >= length) {
                // すべてのコマンドを入力した！

                standby = false; // 処理中にコマンドを受け付けないようにする
                index = 0; // コマンドリセット

                console.log("コマンド入力成功");
                /*
  
            何かしらの処理
            処理が完了したら standby = true に戻す
  
          */
                document.body.classList.add("easter-egg-rotate");
                //3秒後にクラスを削除
                setTimeout(function () {
                    document.body.classList.remove("easter-egg-rotate");
                }, 3000);
                standby = true;
            } else {
                // 一定時間入力がなかったらリセット
                timer = window.setTimeout(function () {
                    index = 0;
                }, wait);
            }
        } else {
            // コマンドが間違っていたらリセット
            index = 0;
        }
    });
})();

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

const queryClient = new QueryClient();

function ForStaff() {
    //bodyにforstaffクラスを追加する
    document.body.classList.add("forstaff");

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {/* index.cssをインポートする */}
                <BrowserRouter basename={config.basename}>
                    <App />
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    );
}
