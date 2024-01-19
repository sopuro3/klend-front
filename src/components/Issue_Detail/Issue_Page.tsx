import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import "./issuepage.css";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Link,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    tableCellClasses,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { detailIssue } from "@/API/API_interface_rewrite";
import { StockTable } from "../Stock_Table/NormStockTable";
import PrintOrganizer from "../print/Print";
import { detailIssueDummy } from "./detailIssue";

export function IssuePage() {
    const { id } = useParams();

    //idがundefinedなら、エラー画面へ遷移する
    if (id === undefined) {
        return (
            <>
                <PageTitle title={"Error!"} />
                <MainCard_ts>
                    <h3>Issue </h3>
                </MainCard_ts>
            </>
        );
    }

    return (
        <Suspense fallback={<PageLoader />}>
            <PageTitle title={`案件 #${id}`} backButton={{}} />

            <Issue id={id} />
        </Suspense>
    );
}
type WithoutWrapper_IssueProps = {
    rollupTitle?: React.Dispatch<React.SetStateAction<string>>;
    isneedEquip?: boolean;
};
export function WithoutWrapper_Issue(props: WithoutWrapper_IssueProps) {
    const { id } = useParams();
    const { rollupTitle, isneedEquip } = props;
    if (id === undefined) {
        return (
            <>
                <PageTitle title={"Error!"} />
                <MainCard_ts>
                    <h3>Issue </h3>
                </MainCard_ts>
            </>
        );
    }
    return (
        <Suspense fallback={<PageLoader />}>
            <Issue
                id={id}
                isneedEquip={isneedEquip}
                rollupTitle={rollupTitle}
            />
        </Suspense>
    );
}

export type IssueProps = {
    id: string;
} & WithoutWrapper_IssueProps;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}));

function Issue(props: IssueProps) {
    const { id, rollupTitle, isneedEquip } = props;
    const response = useSuspenseQuery({
        queryKey: ["issue", id],
        queryFn: () => sleepWithValue(10, detailIssueDummy),
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //undefinedでなければ
    if (rollupTitle) rollupTitle(response.data.issue.displayId);
    const data = response.data;

    const modalStyle = {
        position: "absolute",
        top: "50%",
        borderRadius: "12px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <MainCard_ts>
                <Card>
                    <CardContent className="issueCard" sx={{ padding: 0 }}>
                        <Typography variant="h2">案件の基本情報</Typography>

                        <TableContainer
                            sx={{ minWidth: "min(400px,100%)" }}
                            component={Paper}
                            elevation={1}
                        >
                            <Table
                                className="single-row-table"
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell sx={{ width: 140 }}>
                                            項目
                                        </StyledTableCell>
                                        <StyledTableCell>入力</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <RowItem
                                        name="案件ID"
                                        value={data.issue.displayId}
                                    />
                                    <RowItem
                                        name="被災宅の代表者名"
                                        value={data.issue.name}
                                    />
                                    <RowItem
                                        name="住所"
                                        element={
                                            <div style={{ display: "flex" }}>
                                                <div>{data.issue.address}</div>

                                                <Link
                                                    sx={{
                                                        marginLeft: "auto",
                                                    }}
                                                    onClick={handleOpen}
                                                >
                                                    Google Map
                                                </Link>
                                            </div>
                                        }
                                    />
                                    <RowItem
                                        name="ステータス"
                                        value={data.issue.status}
                                    />
                                    <RowItem
                                        name="備考"
                                        value={data.issue.note}
                                    />
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                        <Divider></Divider>
                        <br />
                        {isneedEquip ? (
                            <></>
                        ) : (
                            <>
                                <Typography variant="h2">資機材情報</Typography>
                                <StockTable
                                    displayItems={data.equipments}
                                ></StockTable>
                            </>
                        )}
                    </CardContent>
                </Card>
            </MainCard_ts>
            <br />
            {data.issue.status === "finish" ||
            data.issue.status === "survey" ? (
                <></>
            ) : (
                <>
                    <InLend data={data}></InLend>
                </>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div style={{ display: "flex" }}>
                        <Warning
                            sx={{
                                color: "warning.dark",
                            }}
                        />

                        <Typography
                            id="modal-modal-title"
                            variant="h3"
                            sx={{ fontSize: "1.5rem" }}
                            component="h2"
                        >
                            注意
                        </Typography>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Google Mapを開きます。{" "}
                    </Typography>
                    <Typography>
                        案件の住所({data.issue.address}
                        )をそのまま検索するため、表記のミスやブレにより正しい場所が表示されない可能性があります。
                    </Typography>
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
                                handleClose();
                                window.open(
                                    "https://www.google.com/maps/search/?api=1&query=" +
                                        data.issue.address,
                                );
                            }}
                        >
                            決定
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

function InLend(props: { data: detailIssue }) {
    const { data } = props;
    const msg =
        data.issue.status === "check"
            ? "資機材貸出数量の確定"
            : "発注書の再印刷";

    return (
        <>
            <MainCard_ts>
                <h2>{msg}</h2>
            </MainCard_ts>
            <br />
            <PrintOrganizer issue={data}></PrintOrganizer>
        </>
    );
}

function PageLoader() {
    return (
        <MainCard_ts>
            <Loader />
        </MainCard_ts>
    );
}
type RowItemProps = {
    name: string;
    value?: string;
    element?: JSX.Element;
};

export function RowItem(props: RowItemProps) {
    const { element, value, name } = props;
    return (
        <>
            <TableRow
                key={name}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell>{element ?? value ?? "なし"}</TableCell>
            </TableRow>
        </>
    );
}
