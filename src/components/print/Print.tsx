import React, { useCallback, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintExample from "./PrintContainer";
import "./Printarea.css";
import { detailIssue } from "@/API/API_interface_rewrite";
import { Button, Card, Paper } from "@mui/material";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import { WithoutWrapper_Issue } from "../Issue_Detail/Issue_Page";
import { PUTPrint } from "@/API/fetch";

type PrintOrganizerProps = {
    issue: detailIssue;
    needequipTable?: boolean;
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

    function print() {
        //ここでAPIを叩く
        console.log(issue.issue.issueId);
        PUTPrint(issue.issue.issueId)
        handlePrint();

    }

    const [width] = useWindowSize();
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

                    <Button onClick={print} variant="contained">
                        印刷を行う
                    </Button>
                </>
            </MainCard_ts>
            <br />

            {width > 800 && (
                <MainCard_ts className="printArea">
                    <h2>印刷プレビュー</h2>
                    <Card
                        component={Paper}
                        elevation={4}
                        sx={{
                            borderRadius: "0",
                        }}
                    >
                        <PrintExample
                            issue={issue}
                            componentRef={componentRef}
                        />
                    </Card>
                </MainCard_ts>
            )}

            {width <= 800 && props.needequipTable != undefined && (
                <>
                    <MainCard_ts>
                        <WithoutWrapper_Issue />
                    </MainCard_ts>
                </>
            )}
        </>
    );
};

export default PrintOrganizer;

const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = (): void => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};
