import { EquipmentSuper } from "@/API/Data_manage";
import { SelectableStockTable, StockTable } from "@/components/Stock_Table/StockTable";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Return_Shikizai.css";
export default function 返却フォームの資機材入力画面() {
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const handleSubmit = () => {
        console.log(value);
        setIsConfirm(true);
    };
    const { id } = useParams();
    const [isConfirm, setIsConfirm] = useState(false);

    console.log(id);
    return (
        <>
            <div className={isConfirm ? "hide" : "visible"}>

            <h3>返却した資機材の数量確認</h3>
            <p>
                破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
            </p>

            <SelectableStockTable 
                            value={value}
            
            isReturn setVal={setValue} />
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
            </div>

            <div className={isConfirm ? "visible" : "hide"}>
                <h3>返却内容の確認</h3>
                <p>
                    以下の内容で返却を行います。よろしいですか？
                </p>
                <StockTable displayItems={value.equipmentswithQuantity} />
                <br />
                <Divider />
                <br />
                <div style={{ display: "flex" }}>
                    <Button
                        onClick={() => setIsConfirm(false)}
                        variant="contained"
                        sx={{ marginLeft: "auto" }}
                    >
                        戻る
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ marginLeft: "auto" }}
                    >
                        送信
                    </Button>
                </div>
            </div>

        </>
    );
}
