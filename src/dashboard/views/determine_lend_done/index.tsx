import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

import "./../../../components/checkmark/borrow_complete.css";
import DoneMark from "@/components/checkmark/Checkmark";
import "./delend_done.css";
import { useState } from "react";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import Print from "@/components/print/Print";
import { useParams } from "react-router-dom";
import { fetchDetailIssue } from "@/API/fetch";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Borrow_complete() {
    const [done, setDone] = useState(false);

    const { id } = useParams();
    if (id === undefined) throw new Error("idがありません");
    const response = useSuspenseQuery({
        queryKey: ["selectableStockTable"],
        queryFn: () => fetchDetailIssue(id),
    });
    const data = response.data;
    setTimeout(() => {
        setDone(true);
    }, 6000);

    return (
        <>
            {!done ? (
                <MainCard_ts>
                    <DoneMark></DoneMark>
                    <div className="text-container">手続きが完了しました！</div>
                </MainCard_ts>
            ) : (
                <div className="fadeIn">
                    <PageTitle
                        title="手続き完了"
                        backButton={{
                            text: "ホーム",
                            link: "/dashboard/default",
                        }}
                    />
                </div>
            )}

            <br />

            <Print needequipTable issue={data}></Print>
        </>
    );
}
