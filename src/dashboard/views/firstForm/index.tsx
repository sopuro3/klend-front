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
import { useForm } from "react-hook-form";

import { EquipmentRequired, LendForm } from "@/API/API_interface";
import { SelectableStockTable } from "@/components/Stock_Table/StockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

import "./needsform.css";
import { useState } from "react";

export default function NeedsForm() {
    return (
        <>
            <PageTitle title="ボランティア案件の新規作成"></PageTitle>
            <MainCard_ts>
                <BasicTable />
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

export function BasicTable() {
    const { register, handleSubmit } = useForm<FormValues>();

    const [value, setValue] = useState<EquipmentRequired>({ equipments: [] });
    const onSubmit = (data: FormValues) => {
        console.log(data);
        console.log(value);
    };

    return (
        <>
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
                                        <StyledTableCell>項目</StyledTableCell>
                                        <StyledTableCell>
                                            入力欄
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <RowItem required row={rows[0]} />
                                    <RowItem required row={rows[1]} />
                                    <RowItem multiline={true} row={rows[2]} />
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
                                sx={{ marginLeft: "auto" }}
                                type="submit"
                            >
                                送信
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );

    function RowItem(props: RowItemProps) {
        const { row, multiline, required: require } = props;
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
                        <TextField
                            {...(multiline && { multiline: true, rows: 6 })}
                            {...(require && { required: true })}
                            sx={{ width: "100%" }}
                            label={row.example}
                            variant="outlined"
                            {...register(row.FormName, {
                                required: require,
                            })}
                        />
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

type RowItemProps = {
    row: rowData;
    required?: boolean;
    multiline?: boolean;
};
