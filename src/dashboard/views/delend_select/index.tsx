import { LendForm } from "@/API/API_interface";
import { EquipmentSuper } from "@/API/Data_manage";
import { WithoutWrapper_Case } from "@/components/Case_Detail/Case_Page";
import { SelectableStockTable } from "@/components/Stock_Table/StockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { Button, useTheme } from "@mui/material";
// import { Button, useTheme } from "@mui/material";
import { useState } from "react";
// import { useForm } from "react-hook-form";




export default function Delend_select() {

    const theme = useTheme();



    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    

    const onClick = () => {
        console.log(value);
    }


    return (
        <>
            <PageTitle title={"貸出数の確定"} />
            <MainCard_ts>
                    <WithoutWrapper_Case />

                    <SelectableStockTable setVal={setValue} />

                    <div style={{ display: "flex" }}>
                                    <Button 
                                        onClick={onClick}
                                        variant="contained"
                                        sx={{
                                            marginLeft: "auto",
                                            background:
                                                theme.palette.primary.main,
                                        }}
                                        type="submit"
                                    >
                                        確認
                                    </Button>
                                </div>
            </MainCard_ts>
        </>
    );
}
