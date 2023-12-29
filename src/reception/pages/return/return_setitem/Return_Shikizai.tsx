import { EquipmentSuper } from "@/API/Data_manage";
import { SelectableStockTable } from "@/components/Stock_Table/StockTable";
import { CallTable } from "@/components/shikizai-table/Shikizai_Table";
import { Button } from "@mui/material";
import { useState } from "react";

export default function 返却フォームの資機材入力画面() {

    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });
    return (
        <>
            <h3>返却した資機材の数量確認</h3>
            <p>
                破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
            </p>
            <SelectableStockTable setVal={setValue}></SelectableStockTable>

            <CallTable></CallTable>

            <div style={{ display: "flex" }}>
                <Button
                    variant="contained"
                    href="/reception/return/done"
                    sx={{ marginLeft: "auto" }}
                >
                    送信
                </Button>
            </div>
        </>
    );
}
