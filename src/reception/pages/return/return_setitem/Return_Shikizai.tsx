import { EquipmentSuper } from "@/API/Data_manage";
import { StockTable } from "@/components/Stock_Table/NormStockTable";
import { SelectableStockTable } from "@/components/Stock_Table/SelectableStockTable";
import { Button, Divider, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

export default function 返却フォームの資機材入力画面() {
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const handleSubmit = () => {
        setConfirm(true);
    };

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    if (id == undefined) throw new Error("idがありません");
    console.log("仮置きよう", id);

    const [confirm, setConfirm] = useState(false);
    const onCancel = () => {
        setConfirm(false);
    };
    const onSubmitConfirm = () => {
        console.log("value", value);

        navigate(`/reception/return/done`);
    };
    const theme = useTheme();

    return (
        <>
            <div className={confirm ? "hide" : "visible"}>
                <h3>返却した資機材の数量確認</h3>
                <p>
                    破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
                </p>

                <SelectableStockTable
                    id={id}
                    isReturn
                    val={value}
                    setVal={setValue}
                />
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
                <div />
            </div>
            <div className={!confirm ? "hide" : "visible"}>
                <h3>確認</h3>
                <p>以下の内容で送信します。よろしいですか？</p>
                <br />

                <StockTable displayItems={value.equipmentswithQuantity} />
                <br />

                <div style={{ display: "flex" }}>
                    <Button
                        variant="contained"
                        sx={{
                            marginRight: "auto",
                            background: theme.palette.success.dark,
                        }}
                        onClick={onCancel}
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
            </div>
        </>
    );
}
