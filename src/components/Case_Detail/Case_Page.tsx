import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

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
                <MainCard_ts>
                    <Loader></Loader>
                </MainCard_ts>
            ) : (
                <>
                    <MainCard_ts>
                        <h1>Case Page</h1>
                        <h3>Case #{id}</h3>
                    </MainCard_ts>
                </>
            )}
        </>
    );
}
