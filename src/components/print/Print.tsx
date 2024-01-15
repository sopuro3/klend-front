import React, { useCallback } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintExample from "./PrintContainer";
import "./Printarea.css";
import { detailIssue } from "@/API/API_interface_rewrite";
import { Button, Card, Paper } from "@mui/material";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

type PrintOrganizerProps = {
    issue: detailIssue;
};

const PrintOrganizer: React.FC<PrintOrganizerProps> = (props) => {
    const componentRef = useRef<HTMLDivElement | null>(null);
    const { issue } = props;
    /**
     * 印刷時のスタイル設定（印刷仕様に応じてスタイリングを調整します）
     *NOTE
     *背景色/背景画像を表示させる設定（Chrome）：-webkit-print-color-adjust: exact
     *pageのmargin指定でプレビュー時にデフォルト表示されるURLと時刻（ヘッダーとフッター）を表示エリアから外している
     */
    const pageStyle = `
    @page { 
      size: auto;
      margin: 5mm;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; }
      table { break-after: auto; }
      tr    { break-inside:avoid; break-after:auto }
      td    { break-inside:avoid; break-after:auto }
    }

    .printParent * {
        margin: 5mm;
    }
  `;

    /**
     * 印刷対象のコンポーネントを設定します
     */
    const reactToPrintContent = useCallback(() => {
        if (!componentRef.current) return null;
        return componentRef.current;
    }, []);

    /**
     * 印刷プレビューを表示します
     */
    const handlePrint = useReactToPrint({
        copyStyles: true,
        pageStyle, // 印刷のスタイリングを指定
        content: reactToPrintContent, // 印刷エリアを指定
        removeAfterPrint: true, // 印刷後に印刷用のiframeを削除する
    });

    return (
        <>
            <MainCard_ts>
                <>
                    <p>
                        印刷を行うと、それ以降は資機材の個数を変更することはできなくなります。
                    </p>
                    <p>
                        ただし、内容の変更を伴わない印刷は何度でも可能であるほか、印刷までは資機材数の変更が可能です。
                    </p>

                    <Button onClick={handlePrint} variant="contained">
                        印刷を行う
                    </Button>
                </>
            </MainCard_ts>
            <br />
            <MainCard_ts className="printArea">
                <h2>印刷プレビュー</h2>
                <Card
                    component={Paper}
                    elevation={4}
                    sx={{
                        borderRadius: "0",
                    }}
                >
                    <PrintExample issue={issue} componentRef={componentRef} />
                </Card>
            </MainCard_ts>
        </>
    );
};

export default PrintOrganizer;
