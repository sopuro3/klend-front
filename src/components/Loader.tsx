import "./loader.css";

//loaderは800ms以内では表示されない。
export default function Loader() {
    return (
        // <div className="loader_parent">
        <div className="static_parent">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="TextWrap">
                    <span>読み込み中</span>
                </div>
            </div>
        </div>
    );
}
