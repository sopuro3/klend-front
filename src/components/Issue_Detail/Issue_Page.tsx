import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import {
    Box,
    Button,
    Card,
    CardContent,
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
            <MainCard_ts>
                <Issue id={id} />
            </MainCard_ts>
        </Suspense>
    );
}
type WithoutWrapper_IssueProps = {
    rollupTitle?: React.Dispatch<React.SetStateAction<string>>;
};
export function WithoutWrapper_Issue(props: WithoutWrapper_IssueProps) {
    const { id } = useParams();
    const { rollupTitle } = props;
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
            <Issue id={id} rollupTitle={rollupTitle} />
        </Suspense>
    );
}

export type IssueProps = {
    id: string;
} & WithoutWrapper_IssueProps;

export const issueData = {
    issue: {
        adress: "久留米市小森野1丁目1-1",
        name: "Jane Smith",
        id: "234e5678-e89b-12d3-a456-426614174002",
        displayId: "0002",
        status: "In Progress",
        note: "Another sample issue.",
    },
};

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
}));

function Issue(props: IssueProps) {
    const { id, rollupTitle } = props;
    /*const _ignore = */ useSuspenseQuery({
        queryKey: ["issue", id],
        queryFn: () => sleepWithValue(1300, issueData),
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //undefinedでなければ
    if (rollupTitle) rollupTitle(issueData.issue.displayId);

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Card>
                <CardContent sx={{ padding: 0 }}>
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
                                    value={issueData.issue.displayId}
                                />
                                <RowItem
                                    name="被災宅の代表者名"
                                    value={issueData.issue.name}
                                />
                                <RowItem
                                    name="住所"
                                    element={
                                        <div style={{ display: "flex" }}>
                                            <div>{issueData.issue.adress}</div>

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
                                    value={issueData.issue.status}
                                />
                                <RowItem
                                    name="備考"
                                    value={issueData.issue.note}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <br></br>
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
                        案件の住所({issueData.issue.adress}
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
                                        issueData.issue.adress,
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
