import { EquipmentSuper } from "@/API/Data_manage";
import { WithoutWrapper_Case } from "@/components/Case_Detail/Case_Page";
import { SelectableStockTable } from "@/components/Stock_Table/StockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { Button, useTheme } from "@mui/material";
// import { Button, useTheme } from "@mui/material";
import { useState } from "react";
// import { useForm } from "react-hook-form";
import "./lend.css";

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

    return (
        <>
            <PageTitle
                title={"貸出数の確定: 案件No." + title}
                backButton={{}}
            />
            <MainCard_ts>
                <div className="survey">
                    <h3>案件の基本情報</h3>
                    <WithoutWrapper_Case rollupTitle={setTitle} />
                    <h3>資機材数の調整</h3>

                    <SelectableStockTable setVal={setValue} />

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
