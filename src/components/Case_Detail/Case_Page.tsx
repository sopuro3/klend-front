import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

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
                    <PageTitle title={"Case #" + id} />
                    <MainCard_ts>
                        <h3>Case </h3>
                    </MainCard_ts>
                </>
            )}
        </>
    );
}
