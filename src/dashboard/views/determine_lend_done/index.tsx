import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

import "./../../../components/checkmark/borrow_complete.css";
import DoneMark from "@/components/checkmark/Checkmark";
import { Button } from "@mui/material";
import "./delend_done.css";
import { useState } from "react";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import Print from "@/components/print/Print";

export default function Borrow_complete() {
    const [done, setDone] = useState(false);

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
                    <PageTitle title="手続き完了" />
                </div>
            )}
            <MainCard_ts>
                <p>このまま、印刷画面へ移動することも可能です。</p>
                <p>印刷後は、資機材の個数を変更することはできなくなります。</p>
                <Button variant="contained">印刷を行う</Button>
            </MainCard_ts>

            <h5>プリントプレビュー</h5>
            <Print></Print>
        </>
    );
}
