import { detailIssue } from "@/API/API_interface_rewrite";
import QRCode from "./makeQR";
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    styled,
} from "@mui/material";
import { EquipmentItem } from "@/API/API_interface";

interface Props {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
    issue: detailIssue;
}

const StyledTableCell = styled(TableCell)(() => ({
    //全てに適用
    fontSize: "1.2rem",
}));

const PrintExample: React.FC<Props> = (props: Props) => {
    const { componentRef, issue } = props;
    console.log(issue);
    return (
        <>
            <div ref={componentRef} className="printParent">
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    <h1>発注書</h1>
                    {/* <div style={{ fontSize: "1.5em" }}>K-Lend</div> */}
                </div>
                <div>
                    <h3 style={{ textAlign: "left" }}>受付情報</h3>
                    <Table size="small" sx={{ width: 450 }}>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        width: 150,
                                        background: "#444!important",
                                        color: "white",
                                    }}
                                >
                                    受付ID
                                </StyledTableCell>
                                <StyledTableCell>
                                    {issue.issue.displayId}
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        width: 150,
                                        background: "#444!important",
                                        color: "white",
                                    }}
                                >
                                    受付日
                                </StyledTableCell>
                                <StyledTableCell>
                                    {new Date().toLocaleDateString()}
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell
                                    sx={{
                                        width: 150,
                                        background: "#444!important",
                                        color: "white",
                                    }}
                                >
                                    住所
                                </StyledTableCell>
                                <StyledTableCell>
                                    {issue.issue.address}
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <h2>返却方法について</h2>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div className="noMargin">
                        <p>
                            資機材の返却を行うには、右のQRコードを読み取り、サイト上で返却した個数を入力してください。
                        </p>
                        <p>
                            QRコードが利用できない場合、https://hogehogefugafuga/reception/return
                            にアクセスし、上記のIDとパスワードを入力してください。
                        </p>
                    </div>
                    <div
                        style={{
                            padding: "10px",
                            background: "white",
                        }}
                    >
                        <QRCode
                            url={`http://${
                                import.meta.env.VITE_PAGE_DOMAIN
                            }/reception/return/${issue.issue.issueId}`}
                        />
                        <p
                            className="noMargin"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            返却用QR
                        </p>
                    </div>
                </div>

                <h2>貸出機材情報</h2>
                <div>
                    <div>
                        <StockTable_ displayItems={issue.equipments} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintExample;
type StockTableProps = {
    displayItems?: EquipmentItem[];
};
function StockTable_(props: StockTableProps) {
    const rows = props.displayItems || [];

    return (
        <Table
            sx={{}}
            size="small"
            className="noMargin"
            aria-label="a dense table"
        >
            <TableHead>
                <TableRow>
                    <StyledTableCell
                        align="left"
                        sx={{
                            background: "#444!important",
                            color: "white",
                            width: 50,
                        }}
                    >
                        No.
                    </StyledTableCell>
                    <StyledTableCell
                        align="left"
                        sx={{
                            background: "#444!important",
                            color: "white",
                            flexGrow: 1,
                        }}
                    >
                        資機材名
                    </StyledTableCell>

                    <StyledTableCell
                        align="left"
                        sx={{
                            background: "#444!important",
                            color: "white",
                        }}
                        className="sp_omission"
                    >
                        数量
                    </StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((equip, index) => (
                    <TableRow
                        key={equip.name}
                        sx={{
                            "&:last-child td, &:last-child th": {
                                border: 0,
                            },
                        }}
                    >
                        <StyledTableCell align="left">{index}</StyledTableCell>
                        <StyledTableCell scope="row">
                            {equip.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {equip.plannedQuantity}
                        </StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
