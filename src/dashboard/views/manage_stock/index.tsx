import { StockTable_Manage } from "@/components/Stock_Table/ManageStockTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { Button } from "@mui/material";
import image from "./image.png";

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
            <br />
            <MainCard_ts>
                <h3>CSVファイルによる一括更新(未実装)</h3>

                <h4>1.CSVファイルのダウンロード</h4>
                <p>
                    以下のボタンをクリックし、資機材一覧のCSVファイルをダウンロードしてください。
                </p>
                <Button variant="contained" color="primary">
                    ダウンロード
                </Button>

                <h4>2.ファイルの編集</h4>
                <p>
                    Excelなどで、それぞれの資機材の調達・破棄個数を入力してください。
                </p>
                <p>
                    必ず、CSVファイルで保存して下さい。xlsxなどのファイル形式ではアップロードできません。
                </p>
                {/* 画像を挿入 */}
                <img src={image} alt="CSVファイルの編集" />

                <h4>3.ファイルのアップロード</h4>
                <p>
                    下のボタンより、編集したCSVファイルをアップロードしてください。
                </p>
                <Button variant="contained" color="primary">
                    アップロード
                </Button>
            </MainCard_ts>
        </>
    );
}
