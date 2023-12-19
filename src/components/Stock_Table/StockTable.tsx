import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {
    Equipment,
    EquipmentItem,
    EquipmentRequired,
} from "@/API/API_interface";
import { IconButton, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Suspense, useState } from "react";
import Loader from "../Loader";
import "./StockTable.css";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { useSuspenseQuery } from "@tanstack/react-query";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
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
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
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

export function StockTable() {
    return (
        <Suspense fallback={<Loader />}>
            <StockTable_ />
        </Suspense>
    );
}

function StockTable_() {
    const response = useSuspenseQuery({
        queryKey: ["stockTable"],
        queryFn: () => sleepWithValue(10, responseItem),
    });
    const rows = response.data.equipments;

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
type SelectableStockTableProps = {
    setVal: React.Dispatch<React.SetStateAction<EquipmentRequired>>;
};
export function SelectableStockTable(props: SelectableStockTableProps) {
    return (
        <Suspense fallback={<Loader />}>
            <SelectableStockTable_ setVal={props.setVal} />
        </Suspense>
    );
}

type EquipmentTmpItem = {
    id: string; // uuid
    name: string; // 備品名
    /**
     * 変数名からもわかる通り、この値は最大値を表すが当然整数型である。
     */
    maxQuantity: number;
    /**
     * 変数名からもわかる通り、この値は最大値を表すが当然整数型である。
     */
    currentQuantity: number;
    note?: string; // 備考

    setCount: React.Dispatch<React.SetStateAction<number>>;
    quantity: number;
};

function SelectableStockTable_(props: SelectableStockTableProps) {
    const response = useSuspenseQuery({
        queryKey: ["selectableStockTable"],
        queryFn: () => sleepWithValue(10, responseItem),
    });
    const rows = response.data.equipments;

    const items: EquipmentTmpItem[] = [];

    const { setVal } = props;

    for (let i = 0; i < rows.length; i++) {
        const [count, setCount] = useState(0);
        items.push({
            name: rows[i].name,
            id: rows[i].id,
            maxQuantity: rows[i].maxQuantity,
            currentQuantity: rows[i].currentQuantity,
            note: rows[i].note,

            setCount: (value) => {
                setCount(value);
                setItem();
            },
            quantity: count,
        });
    }

    function setItem() {
        const tmp: EquipmentRequired = { equipments: [] };
        for (let i = 0; i < items.length; i++) {
            if (items[i].quantity > 0) {
                tmp.equipments.push({
                    id: items[i].id,
                    quantity: items[i].quantity,
                });
            }
        }
        console.log(tmp);
        setVal(tmp);
    }

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
                        {items.map((equip: EquipmentTmpItem) => (
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
                                    <IconButton
                                        onClick={() => {
                                            equip.setCount((count) =>
                                                count > 0 ? count - 1 : 0,
                                            );
                                            // setItem();
                                            console.log(items);

                                            console.log(equip.quantity);
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <TextField
                                        value={equip.quantity}
                                        sx={{ width: "100%" }}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === "") {
                                                equip.setCount(0);
                                            } else {
                                                equip.setCount(parseInt(value));
                                            }
                                            // setItem();
                                            console.log(equip.quantity);
                                        }}
                                    ></TextField>
                                    <IconButton
                                        onClick={() => {
                                            equip.setCount(
                                                (count) => count + 1,
                                            );
                                            // setItem();
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            console.log(equip.quantity);
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
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
