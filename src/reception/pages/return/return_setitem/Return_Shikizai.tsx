import { EquipmentSuper } from "@/API/Data_manage";
import {
    SelectableStockTable,
    StockTable,
} from "@/components/Stock_Table/StockTable";
import { Button, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink,useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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
        console.log("value", value)
        navigate("/reception/return/done");
    };

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
                                    onClick={function(){
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


