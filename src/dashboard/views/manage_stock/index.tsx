import { StockTable_Manage } from "@/components/Stock_Table/ManageStockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

export default function App() {
    return (
        <>
            <PageTitle title={"資機材調達・破棄(資機材個数調整)"} />

            <MainCard_ts>
                <h3>
                    注：この機能はシステムを担当する職員がPCから利用する想定です。
                </h3>
                <p>
                    「管理在庫・貸出状況」はすべての職員が閲覧できるページ、このページはシステム管理用となるページです。
                </p>
            </MainCard_ts>
            <br></br>
            <MainCard_ts>
                <h3>資機材の追加・破棄</h3>
                <StockTable_Manage></StockTable_Manage>
            </MainCard_ts>
        </>
    );
}
