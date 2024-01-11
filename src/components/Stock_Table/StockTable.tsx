import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Equipment, EquipmentItem } from "@/API/API_interface";
import { EquipmentItem_withQuantity, EquipmentSuper } from "@/API/Data_manage";
import {
    Box,
    Button,
    IconButton,
    Link,
    Modal,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
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
            plannedQuantity: 0,
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
            plannedQuantity: 10,

            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            id: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            plannedQuantity: 3,

            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
    ],
};

type StockTableProps = {
    displayItems?: EquipmentItem[];
    /**
     * 資機材個数を更新するモードに入るかどうか
     */
    isUpdateMode?: boolean;
};

export function StockTable(props: StockTableProps) {
    const { displayItems, isUpdateMode } = props;
    return (
        <Suspense fallback={<Loader />}>
            <StockTable_
                displayItems={displayItems}
                isUpdateMode={isUpdateMode}
            />
        </Suspense>
    );
}

function StockTable_(props: StockTableProps) {
    const { displayItems, isUpdateMode } = props;
    let rows;
    let isLocalRequest = false;
    if (!displayItems) {
        const response = useSuspenseQuery({
            queryKey: ["stockTable"],
            queryFn: () => sleepWithValue(10, responseItem),
        });
        rows = response.data.equipments;
    } else {
        rows = displayItems;
        isLocalRequest = true;

        return (
            <TableContainer
                component={Paper}
                elevation={3}
                className="stockTable"
            >
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

                            <TableCell
                                align="left"
                                sx={{ width: "120px" }}
                                className="sp_omission"
                            >
                                現在の在庫数
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ width: "100px", color: "red" }}
                            >
                                選択数
                            </TableCell>

                            <TableCell align="left">備考</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((equip: EquipmentItem_withQuantity) => (
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
                                    {equip.currentQuantity}
                                </TableCell>
                                <TableCell align="right">
                                    {equip.plannedQuantity}
                                </TableCell>

                                <TableCell align="left">{equip.note}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    return (
        <TableContainer component={Paper} elevation={3} className="stockTable">
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

                        <TableCell
                            align="left"
                            sx={{ width: "120px" }}
                            className="sp_omission"
                        >
                            現在の在庫数
                        </TableCell>
                        <TableCell align="left" sx={{ width: "100px" }}>
                            {isLocalRequest ? "選択数" : "使用率"}
                        </TableCell>

                        <TableCell align="left">備考</TableCell>
                        <TableCell
                            sx={{ width: "100px" }}
                            align="left"
                        ></TableCell>
                        {/* isUpdateModeならこの後についか */}

                        {isUpdateMode && (
                            <>
                                <TableCell sx={{ width: "150px" }} align="left">
                                    調達・破棄
                                </TableCell>
                            </>
                        )}
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
                            <TableCell align="right" className="sp_omission">
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

                            {/* isUpdateModeならこの後についか */}

                            {isUpdateMode && (
                                <>
                                    <TableCell
                                        sx={{ width: "100px" }}
                                        align="left"
                                    >
                                        個数調整
                                    </TableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function StockTable_Manage() {
    return (
        <Suspense fallback={<Loader />}>
            <StockTable_Manage_ />
        </Suspense>
    );
}
function StockTable_Manage_() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const response = useSuspenseQuery({
        queryKey: ["stockTable"],
        queryFn: () => sleepWithValue(10, responseItem),
    });

    type equipModalType = {
        name: string;
        maxQuantity: number;
        currentQuantity: number;
    };

    const [adjustQuantity, setAdjustQuantity] = useState<number>(0);
    const [afterQuantity, setAfterQuantity] = useState<number>(0);

    const [equipModal, setEquipModal] = useState<equipModalType>({
        name: "",
        maxQuantity: 0,
        currentQuantity: 0,
    });

    function applyModal(equip: EquipmentItem) {
        setEquipModal({
            name: equip.name,
            maxQuantity: equip.maxQuantity,
            currentQuantity: equip.currentQuantity,
        });
        //初期化
        setAdjustQuantity(0);
        setAfterQuantity(equip.currentQuantity);
        handleOpen();
    }

    function refreshbyTotal(number: number) {
        setAfterQuantity(number);
        setAdjustQuantity(number - equipModal.currentQuantity);

        console.log(`
        afterQuantity:${afterQuantity}
        adjustQuantity:${adjustQuantity}
        number:${number}
        `);

        console.log("refreshbyTotal");
    }

    function refreshbyAdjust(number: number) {
        setAdjustQuantity(number);
        setAfterQuantity(equipModal.currentQuantity + number);

        console.log(`
        afterQuantity:${afterQuantity}
        adjustQuantity:${adjustQuantity}
        number:${number}
        `);

        console.log("refreshbyAdjust");
    }

    useEffect(() => {
        console.log(open);
        // モーダルが開いた後にinputにフォーカスを当てる
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const rows = response.data.equipments;
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <TableContainer
                component={Paper}
                elevation={3}
                className="stockTable"
            >
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

                            <TableCell
                                align="left"
                                sx={{ width: "120px" }}
                                className="sp_omission"
                            >
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
                            {/* isUpdateModeならこの後についか */}

                            <>
                                <TableCell sx={{ width: "150px" }} align="left">
                                    調達・破棄
                                </TableCell>
                            </>
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
                                <TableCell
                                    align="right"
                                    className="sp_omission"
                                >
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

                                {/* isUpdateModeならこの後についか */}

                                <>
                                    <TableCell
                                        sx={{ width: "100px" }}
                                        align="left"
                                    >
                                        {" "}
                                        <Link
                                            underline="hover"
                                            key={"/equipment/" + equip.id}
                                            onClick={() => {
                                                applyModal(equip);
                                            }}
                                        >
                                            個数調整
                                        </Link>
                                    </TableCell>
                                </>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <div style={{ display: "flex" }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h3"
                                sx={{ fontSize: "1.5rem" }}
                                component="h2"
                            >
                                資機材の追加・破棄数入力
                            </Typography>
                        </div>
                        <br />
                        <Typography>
                            「調達・破棄する個数」に、調達を行ったのなら正の個数を、破棄を行ったのなら負の数量を入力してください。
                        </Typography>
                        <Typography>
                            または、「変更後の資機材個数」で個数を設定することも可能です。
                        </Typography>

                        <h4>選択した資機材:{equipModal.name}</h4>

                        <TableContainer component={Paper} elevation={3}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ width: "150px" }}>
                                            現在の資機材個数
                                        </TableCell>
                                        <TableCell>
                                            調達・破棄する個数
                                        </TableCell>
                                        <TableCell>
                                            変更後の資機材個数
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">
                                            {equipModal.currentQuantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                value={adjustQuantity}
                                                onChange={(e) => {
                                                    e.target.value =
                                                        e.target.value.replace(
                                                            //これは正規表現やねん
                                                            //eslint-disable-next-line no-useless-escape
                                                            /[^A-Z0-9\-]/g,
                                                            "",
                                                        );
                                                    // １文字目以外にハイフンが入力されたら削除する
                                                    e.target.value =
                                                        e.target.value.replace(
                                                            /(?<=.)-+/g,
                                                            "",
                                                        );

                                                    refreshbyAdjust(
                                                        Number(e.target.value),
                                                    );
                                                }}
                                            ></TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                autoFocus={true}
                                                sx={{ width: "100%" }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        console.log(
                                                            "Enter key was pressed",
                                                        );
                                                    }
                                                }}
                                                value={afterQuantity}
                                                onChange={(e) => {
                                                    const value =
                                                        e.target.value;

                                                    //valueがNaNになってしまったら0にする
                                                    if (isNaN(Number(value))) {
                                                        setEquipModal(
                                                            (equipModal) => {
                                                                return {
                                                                    ...equipModal,
                                                                    afterQuantity: 0,
                                                                };
                                                            },
                                                        );
                                                        return;
                                                    }

                                                    if (value === "") {
                                                        setEquipModal(
                                                            (equipModal) => {
                                                                return {
                                                                    ...equipModal,
                                                                    afterQuantity: 0,
                                                                };
                                                            },
                                                        );
                                                    } else {
                                                        setEquipModal(
                                                            (equipModal) => {
                                                                return {
                                                                    ...equipModal,
                                                                    afterQuantity:
                                                                        parseInt(
                                                                            value,
                                                                        ),
                                                                };
                                                            },
                                                        );
                                                    }

                                                    refreshbyTotal(
                                                        Number(value),
                                                    );
                                                }}
                                            ></TextField>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Typography></Typography>
                        <br></br>
                        <div style={{ display: "flex" }}>
                            <Button
                                sx={{
                                    marginRight: "auto",
                                }}
                                onClick={handleClose}
                            >
                                キャンセル
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    marginLeft: "auto",
                                }}
                                onClick={() => {
                                    console.log(equipModal);
                                    handleClose();
                                }}
                            >
                                決定
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </>
        </>
    );
}

type SelectableStockTableProps = {
    setVal: React.Dispatch<React.SetStateAction<EquipmentSuper>>;
    /*貸出数確定モード  */
    isDetermineLend?: boolean;
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
    plannedQuantity: number;
};

function SelectableStockTable_(props: SelectableStockTableProps) {
    const response = useSuspenseQuery({
        queryKey: ["selectableStockTable"],
        queryFn: () => sleepWithValue(10, responseItem),
    });
    const rows = response.data.equipments;

    const items: EquipmentTmpItem[] = [];

    const { setVal, isDetermineLend } = props;

    for (let i = 0; i < rows.length; i++) {
        const [count, setCount] = useState(rows[i].plannedQuantity);

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
                tmp.equipmentswithQuantity.push({
                    id: items[i].id,
                    name: items[i].name,
                    maxQuantity: items[i].maxQuantity,
                    currentQuantity: items[i].currentQuantity,
                    note: items[i].note,
                    plannedQuantity: items[i].quantity,
                });
            }
        }
        console.log(tmp);
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
                                    ? "推奨された個数"
                                    : "現在の在庫数"}
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

                                <TableCell
                                    align="right"
                                    className="sp_omission"
                                >
                                    {equip.currentQuantity}
                                </TableCell>
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
                                        }}
                                    ></TextField>
                                    <IconButton
                                        tabIndex={-1}
                                        onClick={() => {
                                            const val = equip.quantity + 1;

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
