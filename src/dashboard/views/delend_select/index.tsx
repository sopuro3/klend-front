import { WithoutWrapper_Case } from "@/components/Case_Detail/Case_Page";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";

export default function Delend_select() {
    return (
        <>
            <PageTitle title={"貸出数の確定"} />
            <MainCard_ts>
                <WithoutWrapper_Case />
            </MainCard_ts>
        </>
    );
}
