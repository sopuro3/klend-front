import { EquipmentSuper } from "@/API/Data_manage";
import { StockTable } from "@/components/Stock_Table/StockTable";
import { SelectableStockTable } from "@/components/Stock_Table/Selectable_rewrite";
import { Button, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { detailIssue } from "@/API/API_rewrite_interface";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
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
export default function 返却フォームの資機材入力画面() {
    const theme = useTheme();

    const [isConfirm, setIsConfirm] = useState(false);
    //エラー出すので
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const onSubmitConfirm = () => {
        const navigate = useNavigate();
        //ここに適当に処理かけな
        console.log("value", value);
        navigate("/reception/return/done");
    };
    const response = useSuspenseQuery({
        queryKey: ["selectableStockTable"],
        queryFn: () => sleepWithValue(10, detailIssueDummy),
    });
    // console.log(value);
    return (
        <>
            {!isConfirm ? (
                <>
                    <h3>返却した資機材の数量確認</h3>
                    <p>
                        破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
                    </p>
                    <SelectableStockTable
                        isReturnMode={true}
                        latestItems={value.equipmentswithQuantity}
                        response={response.data.equipments}
                        setVal={setValue}
                    ></SelectableStockTable>
                    <br />
                    <div style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "auto" }}
                            onClick={() => {
                                setIsConfirm(true);
                            }}
                        >
                            送信
                        </Button>
                    </div>
                    <Link component={RouterLink} to="/reception/return/done">
                        完了画面へ
                    </Link>
                </>
            ) : (
                <>
                    <h3>返却受付の確認</h3>
                    <p>以下の資機材の返却を受け付けます。ご確認ください。</p>
                    <StockTable displayItems={value.equipmentswithQuantity} />
                    <br />
                    <div style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            sx={{
                                marginRight: "auto",
                                background: theme.palette.success.dark,
                            }}
                            onClick={function () {
                                setIsConfirm(false);
                            }}
                        >
                            変更
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                marginLeft: "auto",
                                background: theme.palette.error.main,
                            }}
                            onClick={onSubmitConfirm}
                        >
                            決定
                        </Button>
                    </div>
                    <Link component={RouterLink} to="/reception/return/done">
                        完了画面へ
                    </Link>
                </>
            )}
        </>
    );
}
