import { detailIssue } from "@/API/API_interface_rewrite";
import PrintExample from "./PrintPaper";

interface Props {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
    issue: detailIssue;
}

const PrintExampleContainer: React.FC<Props> = (props: Props) => {
    const { componentRef } = props;
    return (
        <>
            <PrintExample issue={props.issue} componentRef={componentRef} />
        </>
    );
};

export default PrintExampleContainer;
