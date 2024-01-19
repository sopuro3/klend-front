import { EquipmentSuper } from "@/API/Data_manage";
import { SelectableStockTable } from "@/components/Stock_Table/SelectableStockTable";
import { Button } from "@mui/material";
import { useState } from "react";

export default function 返却フォームの資機材入力画面() {
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const handleSubmit = () => {
        console.log(value);
    };

    return (
        <>
            <h3>返却した資機材の数量確認</h3>
            <p>
                破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
            </p>
            <p>ここにテーブルコンポーネントが入ります</p>

            <SelectableStockTable isReturn setVal={setValue} />

            <div style={{ display: "flex" }}>
                <Button onClick={handleSubmit} sx={{ marginLeft: "auto" }}>
                    送信
                </Button>
            </div>
        </>
    );
}
