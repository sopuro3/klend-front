import { EquipmentSuper } from "@/API/Data_manage";
import { SelectableStockTable } from "@/components/Stock_Table/StockTable";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function 返却フォームの資機材入力画面() {
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const handleSubmit = () => {
        console.log(value);
    };
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <h3>返却した資機材の数量確認</h3>
            <p>
                破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
            </p>
            <p>ここにテーブルコンポーネントが入ります</p>

            <SelectableStockTable isReturn setVal={setValue} />
            <br />
            <Divider />
            <br />
            <div style={{ display: "flex" }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ marginLeft: "auto" }}
                >
                    送信
                </Button>
            </div>
        </>
    );
}
