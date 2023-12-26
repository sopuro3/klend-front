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
    created_at: string;
    updated_at: string;
};

type NoticeResponse = {
    notices: NoticeData[];
};

const dummyNoticeResponse: NoticeResponse = {
    notices: [
        {
            id: 1,
            title: "重要なお知らせ",
            content:
                "今週末はメンテナンス作業が行われます。ご迷惑をおかけいたしますが、ご理解とご協力をお願いいたします。",
            created_at: "2023-01-15T10:30:00Z",
            updated_at: "2023-01-15T10:30:00Z",
        },
        {
            id: 2,
            title: "新しい機材追加のお知らせ",
            content:
                "新たにキャンプ用テントと寝袋が追加されました。ご利用の際は事前に予約をお願いいたします。",
            created_at: "2023-02-01T14:45:00Z",
            updated_at: "2023-02-01T14:45:00Z",
        },
        {
            id: 3,
            title: "重要な連絡事項",
            content:
                "特定の機材が不足しており、ご返却いただける方がいればお知らせください。ご協力をお願いいたします。",
            created_at: "2023-03-10T08:20:00Z",
            updated_at: "2023-03-10T08:20:00Z",
        },
    ],
};

function _Notice() {
    useSuspenseQuery({
        queryKey: ["case", dummyNoticeResponse],
        queryFn: () => sleepWithValue(1300, dummyNoticeResponse),
    });

    return (
        <>
            <h2>お知らせ</h2>
            <div className="notice">
                {dummyNoticeResponse.notices.map((notice) => (
                    <Card key={notice.id} component={Paper} elevation={3}>
                        <h3>{notice.title}</h3>
                        <p>{notice.content}</p>
                        <p>{notice.created_at}</p>
                    </Card>
                ))}
            </div>
        </>
    );
}

function PageLoader() {
    return (
        <MainCard_ts>
            <Loader />
        </MainCard_ts>
    );
}
