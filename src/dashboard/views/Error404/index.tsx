import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import "./error.css";
type props = {
    pathname: string;
};

interface customErrorMessage {
    [key: string]: string;
}

const customErrorMessage: customErrorMessage = {
    "/418": "I'm a teapot",
};

export default function Error404(props: props) {
    //customErrorMessageに合致するなら、それを表示する
    let dfMessage =
        "お探しのページは見つかりませんでした。URLが正しいかご確認ください。";
    if (customErrorMessage[props.pathname]) {
        dfMessage = customErrorMessage[props.pathname];
    }
    return (
        <>
            <MainCard_ts>
                <div className="errcontainer">
                    <div className="errcircle-border"></div>
                    <div className="errcircle">
                        <div className="error"></div>
                    </div>
                </div>

                <h1>ページを読み込めません</h1>
                <p>{dfMessage}</p>
            </MainCard_ts>
        </>
    );
}
