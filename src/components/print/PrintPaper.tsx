import { detailIssue } from "@/API/API_interface_rewrite";
import QRCode from "./makeQR";
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
} from "@mui/material";
import { EquipmentItem } from "@/API/API_interface";

interface Props {
    componentRef: React.MutableRefObject<HTMLDivElement | null>;
    issue: detailIssue;
}

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
                    <div style={{ fontSize: "1.5em" }}>K-Lend</div>
                </div>
                <div>
                    <h3 style={{ textAlign: "left" }}>受付情報</h3>
                    <Table size="small" sx={{ width: 450 }}>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: 150,
                                        background: "#444!important",
                                        color: "white",
                                    }}
                                >
                                    受付ID
                                </TableCell>
                                <TableCell>{issue.issue.displayId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: 150,
                                        background: "#444!important",
                                        color: "white",
                                    }}
                                >
                                    受付日
                                </TableCell>
                                <TableCell>
                                    {new Date().toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: 150,
                                        background: "#444!important",
                                        color: "white",
                                    }}
                                >
                                    住所
                                </TableCell>
                                <TableCell>{issue.issue.address}</TableCell>
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
                            url={`http://localhost:5173/reception/return/${issue.issue.id}`}
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
                    <TableCell
                        align="left"
                        sx={{
                            background: "#444!important",
                            color: "white",
                            width: 50,
                        }}
                    >
                        No.
                    </TableCell>
                    <TableCell
                        align="left"
                        sx={{
                            background: "#444!important",
                            color: "white",
                            flexGrow: 1,
                        }}
                    >
                        資機材名
                    </TableCell>

                    <TableCell
                        align="left"
                        sx={{
                            background: "#444!important",
                            color: "white",
                        }}
                        className="sp_omission"
                    >
                        数量
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{RowItem(rows)}</TableBody>
        </Table>
    );
}

function RowItem(rows: EquipmentItem[]) {
    //iが必要なのでmapではなくfor文を使う
    const rowItems = [];
    for (let i = 0; i < rows.length; i++) {
        const equip = rows[i];
        rowItems.push(
            <TableRow
                key={equip.name}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                {" "}
                <TableCell align="left">{i}</TableCell>
                <TableCell scope="row">{equip.name}</TableCell>
                <TableCell align="left">{equip.plannedQuantity}</TableCell>
            </TableRow>,
        );
    }
    return rowItems;
}
