import { useParams } from "react-router-dom";

export default function CasePage() {
    const { id } = useParams();

    return (
        <>
            <h1>Case Page</h1>
            <h3>Case #{id}</h3>
        </>
    );
}
