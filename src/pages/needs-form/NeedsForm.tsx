export default function NeedsForm() {
    return (
        <>
            <h3>ニーズ班情報新規作成(いい名前思いつかん)</h3>
            <BasicTable />
        </>
    );
}

import "./needsform.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
function createData(
    name: string,
    type:
        | typeof String
        | typeof Number
        | typeof Boolean
        | typeof Date
        | typeof Array
        | typeof Object,
) {
    return { name, type };
}

const rows = [
    createData("被災宅の名前(仮)", String),
    createData("住所", String),
];

export function BasicTable() {
    return (
        <>
            <TableContainer component={Paper}>
                <Table className="single-row-table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>項目</TableCell>
                            <TableCell>入力欄</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
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
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <div style={{ display: "flex" }}>
                <Button variant="contained" sx={{ marginLeft: "auto" }}>
                    送信
                </Button>
            </div>
        </>
    );
}
