import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Equipment, EquipmentItem } from "@/API/API_interface";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader";
import "./StockTable.css";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { useSuspenseQuery } from "@tanstack/react-query";

const responseItem: Equipment = {
    equipments: [
        {
            name: "スコップ",
            id: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,
            note: "",
        },
        {
            name: "ハンマー",
            id: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ長い名前の資機材の概要だよ長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            id: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            id: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
    ],
};
const rows = responseItem.equipments;

export function StockTable() {
    return (
        <Suspense fallback={<Loader />}>
            <StockTable_ />
        </Suspense>
    );
}

function StockTable_() {
    /*const _ignore = */ useSuspenseQuery({
        queryKey: ["stockTable"],
        queryFn: () => sleepWithValue(10, "stockTable"),
    });
    return (
        <TableContainer component={Paper} elevation={3}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ width: "150px" }}>
                            資機材名
                        </TableCell>
                        <TableCell align="left" sx={{ width: "100px" }}>
                            保有数
                        </TableCell>

                        <TableCell align="left" sx={{ width: "120px" }}>
                            現在の在庫数
                        </TableCell>
                        <TableCell align="left" sx={{ width: "100px" }}>
                            使用率
                        </TableCell>

                        <TableCell align="left">備考</TableCell>
                        <TableCell
                            sx={{ width: "100px" }}
                            align="left"
                        ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((equip: EquipmentItem) => (
                        <TableRow
                            key={equip.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell scope="row">{equip.name}</TableCell>
                            <TableCell align="right">
                                {equip.maxQuantity}
                            </TableCell>
                            <TableCell align="right">
                                {equip.currentQuantity}
                            </TableCell>
                            <TableCell align="left">
                                {Math.round(
                                    ((equip.maxQuantity -
                                        equip.currentQuantity) /
                                        equip.maxQuantity) *
                                        10000,
                                ) / 100}
                                %
                            </TableCell>
                            <TableCell align="left">{equip.note}</TableCell>
                            <TableCell align="left">
                                <Link
                                    component={RouterLink}
                                    underline="hover"
                                    to={"/equipment/" + equip.id}
                                    key={"/equipment/" + equip.id}
                                >
                                    詳細情報
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function SelectableStockTable() {
    return (
        <Suspense fallback={<Loader />}>
            <SelectableStockTable_ />
        </Suspense>
    );
}

function SelectableStockTable_() {
    /*const _ignore = */ useSuspenseQuery({
        queryKey: ["selectableStockTable"],
        queryFn: () => sleepWithValue(10, "selectableStockTable"),
    });

    return (
        <div>
            <TableContainer component={Paper} elevation={3}>
                <Table sx={{ minWidth: "600px" }} className="bigTable">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: "150px" }}>
                                資機材名
                            </TableCell>
                            <TableCell align="left" sx={{ width: "120px" }}>
                                現在の在庫数
                            </TableCell>

                            <TableCell align="left" sx={{ width: "200px" }}>
                                貸出を希望する個数
                            </TableCell>

                            <TableCell sx={{ width: "200px" }} align="left">
                                備考
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((equip: EquipmentItem) => (
                            <TableRow
                                key={equip.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell scope="row">{equip.name}</TableCell>

                                <TableCell align="right">
                                    {equip.currentQuantity}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ display: "flex" }}
                                >
                                    <TextField
                                        sx={{ width: "100%" }}
                                    ></TextField>
                                </TableCell>

                                <TableCell align="left">{equip.note}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
