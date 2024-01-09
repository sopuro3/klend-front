import {
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    tableCellClasses,
    styled,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { LendForm } from "@/API/API_interface";
import { EquipmentSuper } from "@/API/Data_manage";
import {
    SelectableStockTable,
    StockTable,
} from "@/components/Stock_Table/StockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import "./needsform.css";
import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// type FormStates = {
//     EquipmentSuper: EquipmentSuper;
//     FormValues: LendForm;
// }

export default function NeedsForm() {
    return (
        <>
            <PageTitle title="ボランティア案件の新規作成"></PageTitle>
            <MainCard_ts>
                <InfoInputTable />
            </MainCard_ts>
        </>
    );
}

type rowData = {
    name: string;
    FormName: "name" | "address" | "note";
    example: string;
};
function createData(
    name: string,
    FormName: "name" | "address" | "note",
    example: string,
): rowData {
    return { name, FormName, example };
}

const rows = [
    createData("被災宅の名前(仮)", "name", "例: 久留米 太郎"),
    createData("住所", "address", "例: 久留米市小森野1丁目1-1"),
    createData("備考", "note", ""),
];

type FormValues = LendForm;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}));

// type BasicTableProps = {
//     setIsConfirm: (isConfirm: boolean) => void;
// }

let rollup: FormValues = {
    name: "",
    address: "",
    note: "",
    equipments: [],
};

export function InfoInputTable() {
    const { register, handleSubmit } = useForm<FormValues>();
    const theme = useTheme();
    const navigate = useNavigate();

    const [value, setValue] = useState<EquipmentSuper>({
        equipmentsRequired: [],
        equipmentswithQuantity: [],
    });

    const onSubmit = (data: FormValues) => {
        rollup = data;
        rollup.equipments = value.equipmentsRequired;

        setIsConfirm(true);
    };

    const methods = useForm({
        mode: "onChange",
        criteriaMode: "all",
    });

    const onCancel = () => {
        // setValueの値を初期化する
        setValue({
            equipmentsRequired: [],
            equipmentswithQuantity: [],
        });

        setIsConfirm(false);
    };

    const onSubmitConfirm = () => {
        console.log(rollup);

        //ここに適当に処理かけな

        navigate("/survey/firstform/done");
    };

    const [isConfirm, setIsConfirm] = useState(false);
    return (
        <>
            <FormProvider {...methods}>
                {!isConfirm ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="survey">
                            <div>
                                <h3>案件の基本情報</h3>

                                <TableContainer
                                    sx={{ minWidth: "min(400px,100%)" }}
                                    component={Paper}
                                    elevation={1}
                                >
                                    <Table
                                        className="single-row-table"
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell
                                                    sx={{ width: 200 }}
                                                >
                                                    項目
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    入力欄
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <RowItem required row={rows[0]} />
                                            <RowItem required row={rows[1]} />
                                            <RowItem
                                                multiline={true}
                                                row={rows[2]}
                                            />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <br></br>
                                <Divider></Divider>
                                <br></br>
                            </div>
                            <div>
                                <h3>必要な資機材の見積り</h3>
                                <SelectableStockTable setVal={setValue} />
                                <br></br>
                                <Divider />
                                <br></br>
                                <div style={{ display: "flex" }}>
                                    <Button
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
                            </div>
                        </div>
                    </form>
                ) : (
                    <>
                        <h3>確認</h3>
                        <div className="survey">
                            <p>
                                以下の内容で間違えがないか、今一度ご確認ください。
                            </p>

                            <h3>案件の基本情報</h3>

                            <TableContainer
                                sx={{ minWidth: "min(400px,100%)" }}
                                component={Paper}
                                elevation={1}
                            >
                                <Table
                                    className="single-row-table"
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell
                                                sx={{ width: 200 }}
                                            >
                                                項目
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                入力
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <RowItem
                                            isConfirm
                                            row={rows[0]}
                                            value={rollup.name}
                                        />
                                        <RowItem
                                            isConfirm
                                            row={rows[1]}
                                            value={rollup.address}
                                        />
                                        <RowItem
                                            isConfirm
                                            multiline={true}
                                            row={rows[2]}
                                            value={rollup.note}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br></br>
                            <Divider></Divider>
                            <br></br>
                            <StockTable
                                displayItems={value.equipmentswithQuantity}
                            />
                            <br></br>
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
                            {/* 決定と前に戻るボタンを作る */}
                        </div>
                    </>
                )}
            </FormProvider>
        </>
    );
    type RowItemProps = {
        row: rowData;
        required?: boolean;
        multiline?: boolean;

        isConfirm?: boolean;
        value?: string;
    };

    function RowItem(props: RowItemProps) {
        const {
            row,
            multiline,
            required: requireType,
            isConfirm,
            value,
        } = props;
        return (
            <>
                <TableRow
                    key={row.name}
                    sx={{
                        "&:last-child td, &:last-child th": {
                            border: 0,
                        },
                    }}
                >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell>
                        {isConfirm ? (
                            <>
                                {row.FormName === "note" && value === "" ? (
                                    <p>なし</p>
                                ) : (
                                    <p>{value}</p>
                                )}
                            </>
                        ) : (
                            <TextField
                                {...(multiline && { multiline: true, rows: 6 })}
                                {...(requireType && { required: true })}
                                sx={{ width: "100%" }}
                                label={row.example}
                                variant="outlined"
                                {...register(row.FormName, {
                                    required: requireType,
                                })}
                            />
                        )}
                    </TableCell>
                </TableRow>
            </>
        );
    }
}
