import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";

export default function CasePage() {
    const { id } = useParams();

    //idがundefinedなら、エラー画面へ遷移する
    if (id === undefined) {
        return (
            <>
                <PageTitle title={"Error!"} />
                <MainCard_ts>
                    <h3>Case </h3>
                </MainCard_ts>
            </>
        );
    }

    return (
        <Suspense fallback={<PageLoader />}>
            <Case id={id} />
        </Suspense>
    );
}

type CaseProps = {
    id: string;
};
function Case(props: CaseProps) {
    const { id } = props;
    /*const _ignore = */ useSuspenseQuery({
        queryKey: ["case", id],
        queryFn: () => sleepWithValue(1300, id),
    });
    return (
        <>
            <PageTitle title={`Case #${id}`} />
            <MainCard_ts>
                <h3>Case </h3>
            </MainCard_ts>
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
