import { EquipmentSuper } from "@/API/Data_manage";
import { WithoutWrapper_Issue } from "@/components/Issue_Detail/Issue_Page";
import {
    SelectableStockTable,
    StockTable,
} from "@/components/Stock_Table/StockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { Button, useTheme } from "@mui/material";
import { useState } from "react";
import "./lend.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Delend_select() {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const onSubmit = () => {
        setIsConfirm(true);
    };
    const onCancel = () => {
        setIsConfirm(false);
    };
    const onSubmitConfirm = () => {
        console.log(value.equipmentsRequired);
        //こいつと基本情報を投げる
        console.log("id", id);

        navigate("/determine_lend/done/" + id);
    };
    const [title, setTitle] = useState<string>(" - ");

    const [isConfirm, setIsConfirm] = useState(false);

    return (
        <>
            <PageTitle
                title={"貸出数の確定: 案件No." + title}
                backButton={{}}
            />
            <MainCard_ts>
                <div className="survey">
                    <div className={isConfirm ? "hide" : "visible"}>
                        <h3>案件の基本情報</h3>
                        <WithoutWrapper_Issue rollupTitle={setTitle} />
                        <h3>資機材数の調整</h3>

                        <SelectableStockTable
                            isDetermineLend
                            setVal={setValue}
                        />

                        <div style={{ display: "flex" }}>
                            <Button
                                onClick={onSubmit}
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
                    <div className={!isConfirm ? "hide" : "visible"}>
                        <h3>確認</h3>
                        <p>
                            以下の内容で間違えがないか、今一度ご確認ください。
                        </p>
                        <WithoutWrapper_Issue rollupTitle={setTitle} />

                        <StockTable
                            displayItems={value.equipmentswithQuantity}
                        />

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
                </div>
            </MainCard_ts>
        </>
    );
}
