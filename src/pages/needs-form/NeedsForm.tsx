export default function NeedsForm() {
    return (
        <>
            <h3>ニーズ班情報新規作成(いい名前思いつかん)</h3>
            <BasicTable />
        </>
    );
}

import "./needsform.css";
import { useForm } from "react-hook-form";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

type rowData = {
    name: string;
    FormName: "name" | "address";
};
function createData(name: string, FormName: "name" | "address"): rowData {
    return { name, FormName };
}

const rows = [
    createData("被災宅の名前(仮)", "name"),
    createData("住所", "address"),
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
                            label="入力必須"
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
