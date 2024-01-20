import { ErrorBoundary } from "react-error-boundary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EquipmentItem_withQuantity } from "@/API/Data_manage";
import { Suspense } from "react";
import Loader from "../Loader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { StockTableProps } from "./common";
import { authAxios } from "@/API/axios";
import {
    GETAPI_equipment,
    getEquipmentItem,
} from "@/API/API_interface_rewrite";

async function fetchEquipments(): Promise<GETAPI_equipment> {
    const response = await authAxios.get("/equipment");
    return response.data;
}
export function StockTable(props: StockTableProps) {
    const { displayItems } = props;

    //     //<ErrorBoundary fallback={<h2>Error!!!!</h2>}>
    //   <Suspense fallback={<h1>Loading...</h1>}>
    //   <Component />
    // </Suspense>
    // </ErrorBoundary>
    //https://zenn.dev/renoa/articles/zenn-suspense-errorboundary
    return (
        <ErrorBoundary fallback={<Loader />}>
            <Suspense fallback={<Loader />}>
                <StockTable_ displayItems={displayItems} />
            </Suspense>
        </ErrorBoundary>
    );
}
function StockTable_(props: StockTableProps) {
    const { displayItems } = props;
    let rows;
    let isLocalRequest = false;
    if (!displayItems) {
        const response = useSuspenseQuery({
            queryKey: ["stockTable"],
            //         queryFn: () => sleepWithValue(10, responseItem),
            //queryFn: () => authAxios.get("/equipment").then((res) => { console.log(res.data); return responseItem; })
            queryFn: fetchEquipments,
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
                            <TableCell align="left" sx={{ width: "100px" }}>
                                数量
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
                        {/* <TableCell
                sx={{ width: "100px" }}
                align="left"
            ></TableCell> */}
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
