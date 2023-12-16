import "./needsform.css";
import { useForm } from "react-hook-form";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";


export default function NeedsForm() {
    return (
        <>
            <h3>ニーズ班情報新規作成(いい名前思いつかん)</h3>
            <BasicTable />
        </>
    );
}


type rowData = {
    name: string;
    FormName: "name" | "address";
    example: string;
};
function createData(
    name: string,
    FormName: "name" | "address",
    example: string,
): rowData {
    return { name, FormName, example };
}

const rows = [
    createData("被災宅の名前(仮)", "name", "例: 久留米 太郎"),
    createData("住所", "address", "例: 久留米市小森野1丁目1-1"),
];

type FormValues = {
    name: string;
    address: string;
};

export function BasicTable() {
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TableContainer component={Paper}>
                    <Table
                        className="single-row-table"
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>項目</TableCell>
                                <TableCell>入力欄</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <RowItem row={rows[0]} />
                            <RowItem row={rows[1]} />
                        </TableBody>
                    </Table>
                </TableContainer>
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
            </form>
        </>
    );

    function RowItem(props: RowItemProps) {
        const { row } = props;
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
                            required
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            label={row.example}
                            variant="outlined"
                            {...register(row.FormName, { required: true })}
                        />
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

type RowItemProps = {
    row: rowData;
};
