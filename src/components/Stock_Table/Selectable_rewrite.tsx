import {  detailIssue, getEquipmentItem } from "@/API/API_rewrite_interface";
import {  useState } from "react";
import { EquipmentItem_withQuantity, EquipmentSuper } from "@/API/Data_manage";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";


import AddIcon from "@mui/icons-material/Add";

const detailIssue:detailIssue = {
    issue:{
        address: "東京都新宿区西新宿2-8-1",
        name: "山田太郎",
        id: "a1b2c3d4-1111-2222-3333-123456789abc",
        displayId: "001",
        note: "これは案件1です。",
        status: "in progress",
    },
    equipments:[
        {
            name: "スコップ",
            id: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,

            plannedQuantity: 2,
            note: "",
        },
        {
            name: "ハンマー",
            id: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            plannedQuantity: 5,
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            id: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            plannedQuantity: 3,
            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            id: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            plannedQuantity: 20,
            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        }
    ],
    totalEquipments:4
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
    plannedQuantity?: number;
    note?: string; // 備考

    setCount: React.Dispatch<React.SetStateAction<number>>;
    quantity: number;
    returnQuantity: number;
};




export type SelectableStockTableProps = {
    isReturnMode?: boolean;
    setVal: React.Dispatch<React.SetStateAction<EquipmentSuper>>;
    /*貸出数確定モード  */
    isDetermineLend?: boolean;
    latestItems?: EquipmentItem_withQuantity[];
    response: Array<getEquipmentItem & {
        plannedQuantity: number;
    }>;
};

export function SelectableStockTable(props: SelectableStockTableProps) {

    const { setVal, isDetermineLend, isReturnMode, latestItems,response } = props;
    const rows = response;
    if (latestItems && latestItems.length > 0) {
        for (let i = 0; i < latestItems.length; i++) {
            for (let j = 0; j < rows.length; j++) {
                if (latestItems[i].id === rows[j].id) {
                    rows[j].plannedQuantity = latestItems[i].plannedQuantity;
                }
            }
        }
    }

    const items: EquipmentTmpItem[] = [];

    for (let i = 0; i < rows.length; i++) {
        const [count, setCount] = useState(
            isDetermineLend
                ? rows[i].plannedQuantity
                : 0
        );

        items.push({
            name: rows[i].name,
            id: rows[i].id,
            maxQuantity: rows[i].maxQuantity,
            currentQuantity: rows[i].currentQuantity,
            note: rows[i].note,

            setCount: (value) => {
                setCount(value);
            },
            quantity: count,
            plannedQuantity: rows[i].plannedQuantity,
            returnQuantity: 0,
        });
    }
    console.log(items);

    function setItem(id: string, quantity: number) {
        const tmp: EquipmentSuper = {
            equipmentswithQuantity: [],
            equipmentsRequired: [],
        };
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items[i].quantity = quantity;
            }
            if (items[i].quantity > 0) {
                tmp.equipmentsRequired.push({
                    id: items[i].id,
                    quantity: items[i].quantity,
                });
                if(isReturnMode && items[i].plannedQuantity===undefined){
                    items[i].plannedQuantity=0;
                }
                tmp.equipmentswithQuantity.push({
                    id: items[i].id,
                    name: items[i].name,
                    maxQuantity: items[i].maxQuantity,
                    currentQuantity: items[i].currentQuantity,
                    note: items[i].note,
                    plannedQuantity: (isReturnMode?items[i].plannedQuantity!:items[i].quantity),
                });
            }
        }
        setVal(tmp);
    }
    return (
        <div>
            <TableContainer
                component={Paper}
                elevation={3}
                className="stockTable"
            >
                <Table sx={{ minWidth: "600px" }} className="bigTable">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: "150px" }}>
                                資機材名
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ width: "120px" }}
                                className="sp_omission"
                            >
                                {isDetermineLend
                                    ? "資機材班による推奨個数"
                                    : isReturnMode
                                        ? "貸し出した個数"
                                        : "現在の在庫数"}
                            </TableCell>

                            <TableCell align="left" sx={{ width: "200px" }}>
                                {isReturnMode
                                    ? "返却を行う個数"
                                    : "貸出を希望する個数"}
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

                                <TableCell
                                    align="right"
                                    className="sp_omission"
                                >

                                    
                                    {isReturnMode?
                                    equip.plannedQuantity:
                                    equip.currentQuantity}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ display: "flex" }}
                                >
                                    <IconButton
                                        tabIndex={-1}
                                        onClick={() => {
                                            const val = equip.quantity > 0
                                                ? equip.quantity - 1
                                                : 0;

                                            equip.setCount((count) => count > 0 ? count - 1 : 0
                                            );
                                            setItem(equip.id, val);
                                        } }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <TextField
                                        value={equip.quantity}
                                        sx={{ width: "100%" }}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            //valueがNaNになってしまったら0にする
                                            if (isNaN(Number(value))) {
                                                setItem(equip.id, 0);
                                                return;
                                            }

                                            if (value === "") {
                                                equip.setCount(0);
                                            } else {
                                                equip.setCount(parseInt(value));
                                            }

                                            setItem(equip.id, Number(value));
                                        } }
                                    ></TextField>
                                    <IconButton
                                        tabIndex={-1}
                                        onClick={() => {
                                            const val = equip.quantity + 1;

                                            equip.setCount(
                                                (count) => count + 1
                                            );
                                            setItem(equip.id, val);
                                        } }
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