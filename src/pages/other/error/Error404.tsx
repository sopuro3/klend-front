import './error.css';

export default function Error404() {
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
                <p>
                    URLが存在しません。QRコードを読み込んでこのページが出た場合、どうしようもありません。
                </p>
            </div>
        </>
    );
}
