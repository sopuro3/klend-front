import { StockTable } from "@/components/Stock_Table/StockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

export default function App() {
    return (
        <>
            <PageTitle title={"資機材調達・破棄(資機材個数調整)"} />

            <MainCard_ts>
                <h3>
                    注：この機能はシステムを担当する職員のみが利用できる想定です。
                </h3>
            </MainCard_ts>
            <br></br>
            <MainCard_ts>
                <h3>資機材の追加・破棄</h3>
                <StockTable isUpdateMode></StockTable>
            </MainCard_ts>
        </>
    );
}
