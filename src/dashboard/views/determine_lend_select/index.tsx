import { EquipmentSuper } from "@/API/Data_manage";
import { WithoutWrapper_Issue } from "@/components/Issue_Detail/Issue_Page";
import { SelectableStockTable } from "@/components/Stock_Table/SelectableStockTable";
import { StockTable } from "@/components/Stock_Table/NormStockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { Button, useTheme } from "@mui/material";
import { useState } from "react";
import "./lend.css";
import { useNavigate, useParams } from "react-router-dom";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { useSuspenseQuery } from "@tanstack/react-query";
import { detailIssueDummy } from "@/components/Issue_Detail/detailIssue";

export default function Delend_select() {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });
    const response = useSuspenseQuery({
        queryKey: ["issue", id],
        queryFn: () => sleepWithValue(1390, detailIssueDummy),
    });

    // let POSTData

    console.log(response.data);
    const onSubmit = () => {
        setIsConfirm(true);
    };
    const onCancel = () => {
        setIsConfirm(false);
    };
    const onSubmitConfirm = () => {
        console.log("value", value);

        const equipments = value.equipmentsRequired.map((item) => {
            return {
                equipmentId: item.id,
                plannedQuantity: item.quantity,
            };
        });

        const res = {
            issue: response.data.issue,
            equipments: equipments,
        };

        //あとはこれを投げるだけ
        console.log("res", res, "\nid", id);

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
                        <WithoutWrapper_Issue
                            isneedEquip
                            rollupTitle={setTitle}
                        />
                        <h2>資機材数の調整</h2>

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
                        <WithoutWrapper_Issue
                            isneedEquip
                            rollupTitle={setTitle}
                        />

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
