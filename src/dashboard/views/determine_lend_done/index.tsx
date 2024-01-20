import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

import "./../../../components/checkmark/borrow_complete.css";
import DoneMark from "@/components/checkmark/Checkmark";
import "./delend_done.css";
import { useState } from "react";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import Print from "@/components/print/Print";
import { detailIssue } from "@/API/API_interface_rewrite";

// ダミーデータの生成
const dummyData: detailIssue = {
    issue: {
        address: "123 Main St",
        name: "Issue Name",
        issueId: "dgihoihoadgdgihoihoadihoihosihos1",
        displayId: "0001",
        status: "survey",
        note: "This is a note",
    },
    equipments: [
        {
            name: "スコップ",
            equipmentId: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,
            plannedQuantity: 0,
            note: "",
        },
        {
            name: "ハンマー",
            equipmentId: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            plannedQuantity: 5,

            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            equipmentId: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            plannedQuantity: 10,

            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            equipmentId: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            plannedQuantity: 3,

            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
    ],
    totalEquipments: 1,
};

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

            <Print needequipTable issue={dummyData}></Print>
        </>
    );
}
