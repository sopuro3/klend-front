interface Props {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PrintExample: React.FC<Props> = (props: Props) => {
    const { componentRef } = props;
    return (
        <>
            <div ref={componentRef}>
                <h1>印刷する内容</h1>
                <p>aaaaaaaaaa</p>
            </div>
        </>
    );
};

export default PrintExample;
