import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import {
    Card,
    CardContent,
    Link,
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

import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button.js";
import "@material/web/checkbox/checkbox.js";
import "@material/web/dialog/dialog.js";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "md-checkbox": any;
            "md-dialog": any;
            "md-outlined-button": any;
            "md-filled-button": any;
            "md-text-button": any;
        }
    }
}
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

type IssueProps = {
    id: string;
} & WithoutWrapper_IssueProps;

const issueData = {
    issue: {
        adress: "久留米市小森野1丁目1-1",
        name: "Jane Smith",
        id: "234e5678-e89b-12d3-a456-426614174002",
        displayId: "0002",
        status: "In Progress",
        note: "Another sample issue.",
    },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
    const [isopen, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log("open", isopen);

    //undefinedでなければ
    if (rollupTitle) rollupTitle(issueData.issue.displayId);

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
                                                onClick={() => {
                                                    console.log("click");
                                                    handleOpen();
                                                }}
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

            <md-dialog {...(isopen ? { open: true } : {})}>
                <div slot="headline">Dialog title</div>
                <form slot="content" id="form-id" method="dialog">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Google Mapを開きます。{" "}
                    </Typography>
                    <Typography>
                        案件の住所({issueData.issue.adress}
                        )をそのまま検索するため、表記のミスやブレにより正しい場所が表示されない可能性があります。
                    </Typography>
                    <br></br>
                </form>
                <div slot="actions">
                    <md-text-button
                        form="form-id"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        キャンセル
                    </md-text-button>
                    <md-text-button
                        form="form-id"
                        onClick={() => {
                            handleClose();
                            window.open(
                                "https://www.google.com/maps/search/?api=1&query=" +
                                    issueData.issue.adress,
                            );
                        }}
                    >
                        決定
                    </md-text-button>
                </div>
            </md-dialog>
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

function RowItem(props: RowItemProps) {
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
