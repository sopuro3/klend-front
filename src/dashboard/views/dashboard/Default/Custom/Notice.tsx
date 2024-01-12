import Loader from "@/components/Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { Card, Paper } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import "./Notice.css";
export default function Notice() {
    return (
        <Suspense fallback={<PageLoader />}>
            <MainCard_ts>
                <_Notice />
            </MainCard_ts>
        </Suspense>
    );
}

type NoticeData = {
    id: number;
    title: string;
    content: string;
    created_at: number;
    updated_at: number;
};

type NoticeResponse = {
    notices: NoticeData[];
};

const dummyNoticeResponse: NoticeResponse = {
    notices: [
        {
            id: 1,
            title: "資機材個数の確認作業の実施のお知らせ",
            content:
                "次の日時にて、記録された資機材数と実際に所有する資機材数が正しく一致しているか確認する作業を行います。\n個数の確認を担当する職員は、各資機材の在庫数を担当者に報告してください。",
            created_at: 1704980941495,
            updated_at: 1704980941495,
        },
        {
            id: 2,
            title: "セキュリティ意識向上キャンペーン実施中",
            content:
                "ハッカーからの不正アクセスを防ぐには、一人ひとりのセキュリティ意識の向上も重要です。定期的にパスワードを変更し、不正アクセスを防ぎましょう。",

            created_at: 1694980854259,
            updated_at: 1694980854259,
        },
        {
            id: 3,
            title: "サービス開始のお知らせ",
            content:
                "K-Lend(デモ)の運用を開始しました。以後よろしくお願いいたします。",
            created_at: 1689980869495,
            updated_at: 1689980869495,
        },
    ],
};

function _Notice() {
    useSuspenseQuery({
        queryKey: ["issue", dummyNoticeResponse],
        queryFn: () => sleepWithValue(10, dummyNoticeResponse),
    });

    return (
        <>
            <h2>お知らせ</h2>
            <div className="notice">
                {dummyNoticeResponse.notices.map((notice) => (
                    <Card key={notice.id} component={Paper} elevation={3}>
                        <h3>{notice.title}</h3>
                        <p>{notice.content}</p>
                        <p>{new Date(notice.created_at).toLocaleString()}</p>
                    </Card>
                ))}
                {dummyNoticeResponse.notices.length === 0 && (
                    <Card component={Paper} elevation={3}>
                        <p>お知らせはありません</p>
                    </Card>
                )}
            </div>
        </>
    );
}

function PageLoader() {
    return (
        <MainCard_ts sx={{ height: "100%" }}>
            <Loader />
        </MainCard_ts>
    );
}
