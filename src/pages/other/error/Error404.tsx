import './error.css';
type props = {
    pathname: string;
};

interface customErrorMessage {
    [key: string]: string;
}

const customErrorMessage: customErrorMessage = {
    '/418': "I'm a teapot",
};

export default function Error404(props: props) {
    //customErrorMessageに合致するなら、それを表示する
    let dfMessage =
        'URLが存在しません。QRコードを読み込んでこのページが出た場合、お手持ちの受付番号と併せて管理者へ報告してください。';
    if (customErrorMessage[props.pathname]) {
        dfMessage = customErrorMessage[props.pathname];
    }
    console.log(props.pathname);
    return (
        <>
            <div>
                <div className="errcontainer">
                    <div className="errcircle-border"></div>
                    <div className="errcircle">
                        <div className="error"></div>
                    </div>
                </div>

                <h1>ページを読み込めません</h1>
                <p>{dfMessage}</p>
            </div>
        </>
    );
}
