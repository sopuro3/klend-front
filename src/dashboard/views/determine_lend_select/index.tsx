import { EquipmentSuper } from "@/API/Data_manage";
import { WithoutWrapper_Issue } from "@/components/Issue_Detail/Issue_Page";
import { SelectableStockTable } from "@/components/Stock_Table/Selectable_rewrite";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { Button, useTheme } from "@mui/material";
import { Suspense, useState } from "react";
import "./lend.css";
import { detailIssue } from "@/API/API_rewrite_interface";
import Loader from "@/components/Loader";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { useSuspenseQuery } from "@tanstack/react-query";
const detailIssueDummy: detailIssue = {
    issue: {
        address: "東京都新宿区西新宿2-8-1",
        name: "山田太郎",
        id: "a1b2c3d4-1111-2222-3333-123456789abc",
        displayId: "001",
        note: "これは案件1です。",
        status: "in progress",
    },
    equipments: [
        {
            name: "スコップ",
            id: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,

            plannedQuantity: 2,
            note: "",
        },
        {
            name: "ハンマー",
            id: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            plannedQuantity: 5,
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            id: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            plannedQuantity: 3,
            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            id: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            plannedQuantity: 20,
            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
    ],
    totalEquipments: 4,
};
export default function Delend_select() {
    const theme = useTheme();

    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const onClick = () => {
        console.log(value);
    };

    const [title, setTitle] = useState<string>(" - ");

    const response = useSuspenseQuery({
        queryKey: ["selectableStockTable"],
        queryFn: () => sleepWithValue(10, detailIssueDummy),
    });

    return (
        <>
            <PageTitle
                title={"貸出数の確定: 案件No." + title}
                backButton={{}}
            />
            <MainCard_ts>
                <div className="survey">
                    <h3>案件の基本情報</h3>
                    <WithoutWrapper_Issue rollupTitle={setTitle} />
                    <h3>資機材数の調整</h3>
                    <Suspense fallback={<Loader />}>
                        <SelectableStockTable
                            latestItems={value.equipmentswithQuantity}
                            isDetermineLend
                            response={response.data.equipments}
                            setVal={setValue}
                        />
                    </Suspense>

                    <div style={{ display: "flex" }}>
                        <Button
                            onClick={onClick}
                            variant="contained"
                            sx={{
                                marginLeft: "auto",
                                background: theme.palette.primary.main,
                            }}
                            type="submit"
                        >
                            確認
                        </Button>
                    </div>
                </div>
            </MainCard_ts>
        </>
    );
}
