import CaseTable from "@/components/Case_Table/CaseTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

export default function Caselist() {
    return (
        <>
        <PageTitle title="登録済みの案件一覧"/>

        <MainCard_ts>

            <CaseTable></CaseTable>
        </MainCard_ts>
        </>
    );
}
