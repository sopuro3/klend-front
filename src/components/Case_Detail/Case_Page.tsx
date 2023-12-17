import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

export default function CasePage() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 1300);

    //GET /forom/:id

    return (
        <>
            {isLoading ? (
                <>
                    <Loader></Loader>
                </>
            ) : (
                <>
                    <h1>Case Page</h1>
                    <h3>Case #{id}</h3>
                </>
            )}
        </>
    );
}
