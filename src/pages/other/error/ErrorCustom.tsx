import "./error.css"

type props = {
    JSXElement: JSX.Element;
}

export default function ErrorCustom(props:props){
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
            {/* props.JSXElementを読み込む */}
            {props.JSXElement}
        </div>
        </>
    );
}