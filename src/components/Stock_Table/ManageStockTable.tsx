/**
 * このコンポーネントは「資機材調達・廃棄」で用いている、個数を調整するモーダルを付属した資機材テーブルである。
 */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Link,
    Modal,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authAxios } from "@/API/axios";
import {
    GETAPI_equipment,
    getEquipmentItem,
} from "@/API/API_interface_rewrite";
async function fetchEquipments(): Promise<GETAPI_equipment> {
    const response = await authAxios.get("/equipment");
    return response.data;
}
/**
 * 個数の調整ができるタイプの資機材テーブル
 *
 * @returns
 */
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

    function cancelModal() {
        setIsConfirm(false);
        handleClose();
    }

    const response = useSuspenseQuery({
        queryKey: ["stockTable"],
        // queryFn: () => sleepWithValue(10, responseItem),
        queryFn: fetchEquipments,
    });

    type equipModalType = {
        name: string;
        maxQuantity: number;
        note: string;
        id: string;
    };
    const modal = useRef(null);

    const [adjustQuantity, setAdjustQuantity] = useState<number>(0);
    const [afterQuantity, setAfterQuantity] = useState<number>(0);

    const [equipModal, setEquipModal] = useState<equipModalType>({
        name: "",
        maxQuantity: 0,
        note: "",
        id: "",
    });

    function applyModal(equip: getEquipmentItem) {
        setEquipModal({
            name: equip.name,
            maxQuantity: equip.maxQuantity,
            note: equip.note,
            id: equip.equipmentId,
        });
        console.log(equip);
        //初期化
        setAdjustQuantity(0);
        setAfterQuantity(equip.maxQuantity);
        handleOpen();
    }

    function refreshbyTotal(number: number) {
        setAfterQuantity(number);
        if (number - equipModal.maxQuantity >= 0) {
            setIsPlus(true);
            setAdjustQuantity(number - equipModal.maxQuantity);
        } else {
            setIsPlus(false);
            // number - equipModal.currentQuantityの値がマイナスになるので、絶対値をとる
            setAdjustQuantity(Math.abs(number - equipModal.maxQuantity));
        }
    }

    function refreshbyAdjust(number: number) {
        setAdjustQuantity(number);
        if (isPlus) {
            setAfterQuantity(equipModal.maxQuantity + number);
        } else {
            setAfterQuantity(equipModal.maxQuantity - number);
        }
    }

    const [isConfirm, setIsConfirm] = useState(false);

    //調達か破棄か
    const [isPlus, setIsPlus] = useState(true);

    useEffect(() => {
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
        bgcolor: "background.paper",
        borderRadius: "12px",
        boxShadow: 24,
        p: 4,
        width: "min(100%,600px)",
    };
    function moveConfirm() {
        // console.log(equipModal);
        setIsConfirm(true);
    }
    function cancelConfirm() {
        setIsConfirm(false);
    }

    // ...

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                console.log("Enter key pressed");
                console.log(isConfirm);
                // Handle Enter key press
                // Call the function you want to execute
            } else if (event.key === "ArrowLeft") {
                cancelConfirm();
            }
        };

        // Add event listeners when the modal is open
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
        }

        // Remove event listeners when the modal is closed
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, isConfirm]);

    // ...
    type PUTequip = {
        name: string;
        maxQuantity: number;
        note: string;
    };
    function POST() {
        const putEquip: PUTequip = {
            name: equipModal.name,
            maxQuantity: afterQuantity,
            note: equipModal.note,
        };

        console.log(equipModal.id, putEquip);
        PUTEquipments(equipModal.id, putEquip);

        //テーブルを更新し、再描画する
        setTimeout(() => {
            response.refetch();
        }, 300);

        cancelModal();

        async function PUTEquipments(
            id: string,
            PUTequip: PUTequip,
        ): Promise<void> {
            const response = await authAxios.put("/equipment/" + id, PUTequip);
            return response.data;
        }
    }

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
                            {/* <TableCell
                sx={{ width: "100px" }}
                align="left"
            ></TableCell> */}
                            {/* isUpdateModeならこの後についか */}

                            <TableCell sx={{ width: "150px" }} align="left">
                                調達・破棄
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((equip: getEquipmentItem) => (
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
                                {/* <TableCell align="left">
                        <Link
                            component={RouterLink}
                            underline="hover"
                            to={"/equipment/" + equip.id}
                            key={"/equipment/" + equip.id}
                        >
                            詳細情報
                        </Link>
                    </TableCell> */}

                                {/* isUpdateModeならこの後についか */}

                                <TableCell sx={{ width: "100px" }} align="left">
                                    {" "}
                                    <Link
                                        underline="hover"
                                        key={"/equipment/" + equip.equipmentId}
                                        onClick={() => {
                                            applyModal(equip);
                                        }}
                                    >
                                        個数調整
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                ref={modal}
                open={open}
                onClose={cancelModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {!isConfirm ? (
                    <Box sx={modalStyle} className="classmodal">
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
                            「調達・破棄する個数」に、調達および破棄を行った数量を入力してください。
                        </Typography>
                        <Typography>
                            または、「変更後の資機材個数」で個数を設定することも可能です。
                        </Typography>

                        <h4>選択した資機材:{equipModal.name}</h4>

                        <div>
                            <h4 className="miniDisplay">
                                現在の資器材個数:{" "}
                                <span style={{ fontSize: "1.3rem" }}>
                                    {equipModal.maxQuantity}
                                </span>
                            </h4>
                            <h4 className="miniDisplay">
                                変更後の資機材個数:{" "}
                                <span style={{ fontSize: "1.3rem" }}>
                                    {equipModal.maxQuantity}
                                    <span
                                        style={{
                                            color:
                                                isPlus === true
                                                    ? "green"
                                                    : "red",
                                        }}
                                    >
                                        {/* 増減なしなら±を表示し、増加アリなら+を表示する */}
                                        {adjustQuantity === 0
                                            ? "±"
                                            : isPlus
                                            ? "+"
                                            : "-"}
                                        {adjustQuantity}
                                    </span>
                                    <span>={afterQuantity}</span>
                                </span>
                            </h4>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                sx={{ width: "110px" }}
                                                className="miniOmmit"
                                            >
                                                現在の資機材個数
                                            </TableCell>
                                            <TableCell sx={{ width: "150px" }}>
                                                調達・破棄する個数
                                            </TableCell>
                                            <TableCell>
                                                変更後の資機材個数
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                align="right"
                                                className="miniOmmit"
                                                sx={{
                                                    fontSize: "1.3rem",
                                                }}
                                            >
                                                {equipModal.maxQuantity}(
                                                <span
                                                    style={{
                                                        color:
                                                            isPlus === true
                                                                ? "green"
                                                                : "red",
                                                    }}
                                                >
                                                    {/* 増減なしなら±を表示し、増加アリなら+を表示する */}
                                                    {adjustQuantity === 0
                                                        ? "±"
                                                        : isPlus
                                                        ? "+"
                                                        : "-"}
                                                    {adjustQuantity}
                                                </span>
                                                )
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    display: "flex",
                                                    flexGrow: 1,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FormControl>
                                                    <RadioGroup
                                                        value={
                                                            isPlus
                                                                ? "plus"
                                                                : "minus"
                                                        }
                                                        sx={{ width: "100px" }}
                                                        name="radio-buttons-group"
                                                        onChange={(e) => {
                                                            setIsPlus(
                                                                e.target
                                                                    .value ===
                                                                    "plus",
                                                            );
                                                            setAdjustQuantity(
                                                                adjustQuantity,
                                                            );
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            value="plus"
                                                            control={<Radio />}
                                                            label="調達"
                                                        />
                                                        <FormControlLabel
                                                            value="minus"
                                                            control={<Radio />}
                                                            label="破棄"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                                <TextField
                                                    sx={{ width: "100px" }}
                                                    value={adjustQuantity}
                                                    onChange={(e) => {
                                                        e.target.value =
                                                            e.target.value.replace(
                                                                //これは正規表現やねん
                                                                /[^A-Z0-9]/g,
                                                                "",
                                                            );

                                                        refreshbyAdjust(
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        );
                                                    }}
                                                ></TextField>
                                            </TableCell>
                                            <TableCell sx={{ width: 100 }}>
                                                <TextField
                                                    autoFocus={true}
                                                    sx={{ width: "100px" }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            moveConfirm();
                                                        }
                                                    }}
                                                    value={afterQuantity}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;

                                                        //valueがNaNになってしまったら0にする
                                                        if (
                                                            isNaN(Number(value))
                                                        ) {
                                                            setEquipModal(
                                                                (
                                                                    equipModal,
                                                                ) => {
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
                                                                (
                                                                    equipModal,
                                                                ) => {
                                                                    return {
                                                                        ...equipModal,
                                                                        afterQuantity: 0,
                                                                    };
                                                                },
                                                            );
                                                        } else {
                                                            setEquipModal(
                                                                (
                                                                    equipModal,
                                                                ) => {
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
                        </div>
                        <br></br>
                        <div style={{ display: "flex" }}>
                            <Button
                                sx={{
                                    marginRight: "auto",
                                }}
                                onClick={cancelModal}
                            >
                                キャンセル
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    marginLeft: "auto",
                                }}
                                onClick={moveConfirm}
                            >
                                決定
                            </Button>
                        </div>
                    </Box>
                ) : (
                    <Box sx={modalStyle}>
                        <div style={{ display: "flex" }}>
                            <Typography
                                id="modal-modal-title"
                                variant="h3"
                                sx={{ fontSize: "1.5rem" }}
                                component="h2"
                            >
                                資機材数変更の確認
                            </Typography>
                        </div>
                        <br />
                        <Typography>
                            以下の操作を実行します。よろしいですか？
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
                                            変更後の資機材個数
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            align="right"
                                            sx={{ fontSize: "1.3rem" }}
                                        >
                                            {equipModal.maxQuantity}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                sx={{
                                                    fontSize: "1.3rem",
                                                }}
                                            >
                                                {afterQuantity}(
                                                <span
                                                    style={{
                                                        color:
                                                            isPlus === true
                                                                ? "green"
                                                                : "red",
                                                    }}
                                                >
                                                    {/* 増減なしなら±を表示し、増加アリなら+を表示する */}
                                                    {adjustQuantity === 0
                                                        ? "±"
                                                        : isPlus
                                                        ? "+"
                                                        : "-"}
                                                    {adjustQuantity}
                                                </span>
                                                )
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <br></br>
                        <div style={{ display: "flex" }}>
                            <Button
                                sx={{
                                    marginRight: "auto",
                                }}
                                onClick={() => {
                                    cancelConfirm();
                                }}
                            >
                                変更
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    marginLeft: "auto",
                                }}
                                onClick={POST}
                            >
                                決定
                            </Button>
                        </div>
                    </Box>
                )}
            </Modal>
        </>
    );
}
