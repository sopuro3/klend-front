import { EquipmentSuper } from "@/API/Data_manage";
import { SelectableStockTable } from "@/components/Stock_Table/StockTable";
import { Button, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function 返却フォームの資機材入力画面() {
    const [isConfirm, setIsConfirm] = useState(false);
    //エラー出すので
    setIsConfirm(true);
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });
    console.log(value);
    return (
        <>
            {!isConfirm ? (
                <>
                    <h3>返却した資機材の数量確認</h3>
                    <p>
                        破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
                    </p>
                    <SelectableStockTable
                        setVal={setValue}
                    ></SelectableStockTable>
                    <br />
                    <div style={{ display: "flex" }}>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "auto" }}
                            onClick={() => {
                                console.log(value);
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
                <h3>送信完了</h3>
            )}
        </>
    );
}
