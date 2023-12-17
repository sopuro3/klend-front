import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Case, FormResponse } from "@/API/API_interface";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loader";

const responseItem: FormResponse = {
    issue: [
        {
            adress: "123 Main St",
            name: "John Doe",
            id: "123e4567-e89b-12d3-a456-426614174001",
            displayId: "0001",
            status: "Pending",
            note: "This is a sample case.",
        },
        {
            adress: "456 Oak Ave",
            name: "Jane Smith",
            id: "234e5678-e89b-12d3-a456-426614174002",
            displayId: "0002",
            status: "In Progress",
            note: "Another sample case.",
        },
        // Add more cases as needed
    ],
};

const rows = responseItem.issue;

export default function StockTable() {
    const [isLoading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 10);

    return (
        <>
            {isLoading ? (
                <>
                    <Loader></Loader>
                </>
            ) : (
                <>
                    <TableContainer component={Paper} elevation={3}>
                        <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ width: "80px" }}
                                    >
                                        受付ID
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ width: "180px" }}
                                    >
                                        被災者の代表者名
                                    </TableCell>
                                    <TableCell align="left">住所</TableCell>

                                    <TableCell
                                        align="left"
                                        sx={{ width: "180px" }}
                                    >
                                        現在の状態
                                    </TableCell>
                                    <TableCell align="left">概要</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((issue: Case) => (
                                    <TableRow
                                        key={issue.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" align="right">
                                            {issue.displayId}
                                        </TableCell>
                                        <TableCell scope="row">
                                            {issue.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {issue.adress}
                                        </TableCell>
                                        <TableCell align="left">
                                            {issue.status}
                                        </TableCell>
                                        <TableCell align="left">
                                            {issue.note}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Link
                                                component={RouterLink}
                                                underline="hover"
                                                to={"/case/" + issue.id}
                                                key={"/case/" + issue.id}
                                            >
                                                詳細情報
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
}
