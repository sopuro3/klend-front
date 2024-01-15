import React, { useCallback } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintExample from "./PrintContainer";
import "./Printarea.css";
import { detailIssue } from "@/API/API_interface_rewrite";

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
            <div className="p-4">
                <div className="flex justify-center">
                    <div className="w-1/4">
                        <button
                            onClick={handlePrint}
                            className={
                                "w-full h-9 font-semibold rounded-medium border border-gray-darkest text-white bg-blue-500 hover:bg-indigo-700"
                            }
                        >
                            印刷
                        </button>
                    </div>
                </div>
                <div className="printArea">
                    <PrintExample issue={issue} componentRef={componentRef} />
                </div>
            </div>
        </>
    );
};

export default PrintOrganizer;
