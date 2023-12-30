import IssueTable from "@/components/Issue_Table/IssueTable";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

export default function Issuelist() {
    return (
        <>
            <PageTitle title="登録済み案件一覧" />

            <MainCard_ts>
                <IssueTable></IssueTable>
            </MainCard_ts>
        </>
    );
}
