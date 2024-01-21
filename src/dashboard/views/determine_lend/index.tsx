import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import IssueTable from "@/components/Issue_Table/IssueTable";
import { useState } from "react";
import { Issue } from "@/API/API_interface";

export default function Borrow() {
    const [selected, setSelected] = useState<Issue>();

    //selected使わねえな...せや！
    selected;

    const handleSetSelected = (issue: Issue) => {
        console.log("issue", issue);
        setSelected(issue);

        //react-router-domを用いて、URLを変更する。
        // navigate("/determine_lend/select/" + issue.id);
        //react-router-domだとなぜかいろいろと不安定になるので、location.hrefを使う。
        location.href = "/dashboard/determine_lend/select/" + issue.issueId;
    };

    return (
        <>
            <PageTitle
                title={"貸出数確認・確定"}
                backButton={{ text: "ホーム", link: "/dashboard/default" }}
            />
            <MainCard_ts>
                <h3>案件を選択する</h3>
                <IssueTable selectBtn setValue={handleSetSelected} />
            </MainCard_ts>
        </>
    );
}

// // https://mui.com/x/react-date-pickers/date-picker/
// //ここより取得。フォームではこういうのが役に立つ。
// export function BasicDatePicker() {
//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DemoContainer components={["DatePicker"]}>
//                 <DatePicker label="日付を選択" format="YYYY-MM-DD" />
//             </DemoContainer>
//         </LocalizationProvider>
//     );
// }
