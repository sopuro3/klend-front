import PrintExample from "./PrintPaper";

interface Props {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PrintExampleContainer: React.FC<Props> = (props: Props) => {
    const { componentRef } = props;
    return (
        <>
            <PrintExample componentRef={componentRef} />
        </>
    );
};

export default PrintExampleContainer;
