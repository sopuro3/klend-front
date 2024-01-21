import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { EquipmentSuper } from "@/API/Data_manage";
import { IconButton, Tooltip } from "@mui/material";
import { Suspense, useState } from "react";
import Loader from "../Loader";
import "./StockTable.css";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { useSuspenseQuery } from "@tanstack/react-query";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { authAxios } from "@/API/axios";

import { responseItem } from "./responseItem";
import { GETAPI_equipment } from "@/API/API_interface_rewrite";

async function fetchEquipments(): Promise<GETAPI_equipment> {
    const response = await authAxios.get("/equipment");
    return response.data;
}

type SelectableStockTableProps = {
    setVal: React.Dispatch<React.SetStateAction<EquipmentSuper>>;
    latestVal?: EquipmentSuper;
    /*貸出数確定モード  */
    isDetermineLend?: boolean;
    isReturn?: boolean;
    id: string;
    val?: EquipmentSuper;
};
export function SelectableStockTable(props: SelectableStockTableProps) {
    return (
        <Suspense fallback={<Loader />}>
            <SelectableStockTable_
                setVal={props.setVal}
                isReturn={props.isReturn}
                isDetermineLend={props.isDetermineLend}
                latestVal={props.latestVal}
                id={props.id}
                val={props.val}
            />
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
    plannedQuantity: number;

    handleOpen: () => void;
    handleClose: () => void;
    setTooltipMsg: React.Dispatch<React.SetStateAction<string>>;
    tooltipMsg: string;

    fieldopen: boolean;
};

function SelectableStockTable_(props: SelectableStockTableProps) {
    const { setVal, isDetermineLend, isReturn, val } = props;
    const items: EquipmentTmpItem[] = [];
    if (isReturn || isDetermineLend) {
        const response = useSuspenseQuery({
            queryKey: ["selectableStockTable"],
            queryFn: () => sleepWithValue(10, responseItem),
        });
        const rows = response.data.equipments;

        for (let i = 0; i < rows.length; i++) {
            //getEquipmentItemの場合

            const [count, setCount] = useState(rows[i].plannedQuantity);

            //全角入力モードになっていたら怒る
            const [fieldopen, setFieldOpen] = useState(false);

            const handleClose = () => {
                setFieldOpen(false);
            };

            const handleOpen = () => {
                setFieldOpen(true);
            };
            const [tooltipMsg, setTooltipMsg] = useState("");

            items.push({
                name: rows[i].name,
                id: rows[i].equipmentId,
                maxQuantity: rows[i].maxQuantity,
                currentQuantity: rows[i].currentQuantity,
                note: rows[i].note,

                setCount: (value) => {
                    setCount(value);
                },
                quantity: count,
                plannedQuantity: rows[i].plannedQuantity,
                handleOpen: handleOpen,
                handleClose: handleClose,
                tooltipMsg: tooltipMsg,
                fieldopen: fieldopen,
                setTooltipMsg: setTooltipMsg,
            });
        }
    } else {
        const response = useSuspenseQuery({
            queryKey: ["selectableStockTable"],
            queryFn: () => fetchEquipments(),
        });
        const rows = response.data.equipments;

        for (let i = 0; i < rows.length; i++) {
            //getEquipmentItemの場合

            const [count, setCount] = useState(0);

            //全角入力モードになっていたら怒る
            const [fieldopen, setFieldOpen] = useState(false);

            const handleClose = () => {
                setFieldOpen(false);
            };

            const handleOpen = () => {
                setFieldOpen(true);
            };
            const [tooltipMsg, setTooltipMsg] = useState("");

            items.push({
                name: rows[i].name,
                id: rows[i].equipmentId,
                maxQuantity: rows[i].maxQuantity,
                currentQuantity: rows[i].currentQuantity,
                note: rows[i].note,

                setCount: (value) => {
                    setCount(value);
                },
                quantity: count,
                plannedQuantity: 0,
                handleOpen: handleOpen,
                handleClose: handleClose,
                tooltipMsg: tooltipMsg,

                fieldopen: fieldopen,
                setTooltipMsg: setTooltipMsg,
            });
        }
    }

    // console.log(items);

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
                tmp.equipmentswithQuantity.push({
                    equipmentId: items[i].id,
                    name: items[i].name,
                    maxQuantity: items[i].maxQuantity,
                    currentQuantity: items[i].currentQuantity,
                    note: items[i].note,
                    plannedQuantity: items[i].quantity,
                });
            }
        }
        // console.log(tmp);
        setVal(tmp);
    }

    //説明しよう！
    //初回時は親の持つデータは空なので、そのまま確認を押すとたとえ貸出数確定とかでおススメ値が入っていても、
    //それを無視して空のデータを送信してしまう。
    //そこで、初回時は謎のデータに対して0を送信することで、
    //無理やりSetValを実行させる
    if (val?.equipmentsRequired.length === 0) {
        setItem("fake-Item", 0);
    }

    return (
        <div>
            <TableContainer
                component={Paper}
                elevation={3}
                className="stockTable"
                sx={{
                    maxHeight: "600px",
                }}
            >
                <Table sx={{ minWidth: "600px" }} className="bigTable">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: "150px" }}>
                                資機材名
                            </TableCell>

                            <TableCell
                                align="left"
                                sx={{ width: "100px" }}
                                className="sp_omission"
                            >
                                {isReturn ? "貸し出した個数" : "現在の在庫数"}
                            </TableCell>

                            {isDetermineLend && (
                                <TableCell
                                    align="left"
                                    sx={{ width: "140px" }}
                                    className="sp_omission"
                                >
                                    初期調査での見積り
                                </TableCell>
                            )}

                            <TableCell align="left" sx={{ width: "200px" }}>
                                {!isReturn
                                    ? "貸し出しを行う個数"
                                    : "返却を行う個数"}
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
                                    {isReturn
                                        ? equip.plannedQuantity
                                        : equip.currentQuantity}
                                </TableCell>
                                {isDetermineLend && (
                                    <TableCell
                                        align="right"
                                        className="sp_omission"
                                    >
                                        {equip.plannedQuantity}
                                    </TableCell>
                                )}
                                <TableCell
                                    align="left"
                                    sx={{ display: "flex" }}
                                >
                                    <IconButton
                                        tabIndex={-1}
                                        onClick={() => {
                                            const val =
                                                equip.quantity > 0
                                                    ? equip.quantity - 1
                                                    : 0;

                                            equip.setCount((count) =>
                                                count > 0 ? count - 1 : 0,
                                            );
                                            setItem(equip.id, val);
                                            // console.log(items);

                                            // console.log(equip.quantity);
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Tooltip
                                        open={equip.fieldopen}
                                        title={equip.tooltipMsg}
                                    >
                                        <TextField
                                            value={equip.quantity}
                                            sx={{ width: "100%" }}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                //valueがNaNになってしまったら0にする
                                                if (isNaN(Number(value))) {
                                                    equip.setTooltipMsg(
                                                        "半角数字のみ有効です",
                                                    );
                                                    equip.handleOpen();

                                                    setItem(equip.id, 0);
                                                    return;
                                                }

                                                const maxVal = isReturn
                                                    ? equip.plannedQuantity
                                                    : equip.currentQuantity;
                                                if (parseInt(value) > maxVal) {
                                                    if (maxVal === 0) {
                                                        return;
                                                    }
                                                    equip.setTooltipMsg(
                                                        `最大値は${maxVal}です`,
                                                    );
                                                    equip.handleOpen();

                                                    return;
                                                }
                                                if (value === "") {
                                                    equip.setCount(0);
                                                } else {
                                                    equip.handleClose();
                                                    equip.setCount(
                                                        parseInt(value),
                                                    );
                                                }

                                                setItem(
                                                    equip.id,
                                                    Number(value),
                                                );
                                            }}
                                        ></TextField>
                                    </Tooltip>
                                    <IconButton
                                        tabIndex={-1}
                                        onClick={() => {
                                            const val = equip.quantity + 1;

                                            const maxVal = isReturn
                                                ? equip.plannedQuantity
                                                : equip.currentQuantity;
                                            if (val > maxVal) {
                                                if (maxVal === 0) {
                                                    return;
                                                }
                                                equip.setTooltipMsg(
                                                    `最大値は${maxVal}です`,
                                                );
                                                equip.handleOpen();
                                                setTimeout(() => {
                                                    equip.handleClose();
                                                }, 4000);
                                                return;
                                            }

                                            equip.setCount(
                                                (count) => count + 1,
                                            );
                                            setItem(equip.id, val);
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    {/* <IconButton
                                        onClick={() => {
                                            console.log(equip.quantity);
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton> */}
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
