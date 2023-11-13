import './error.css';

export default function Error401() {
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
                <p>この返却用QRコードはすでに利用されています。</p>
            </div>
        </>
    );
}
