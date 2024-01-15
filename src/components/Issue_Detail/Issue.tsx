import { useState } from "react";
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
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { IssueProps, issueData, StyledTableCell, RowItem } from "./Issue_Page";

export function Issue(props: IssueProps) {
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
        borderRadius: "12px",
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
                                            <div>{issueData.issue.address}</div>

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
                        案件の住所({issueData.issue.address}
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
                                        issueData.issue.address,
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
