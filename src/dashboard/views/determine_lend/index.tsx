import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import CaseTable from "@/components/Case_Table/CaseTable";
import { useState } from "react";
import { Case } from "@/API/API_interface";

export default function Borrow() {
    const [selected, setSelected] = useState<Case>();
    const navigate = useNavigate();

    //selected使わねえな...せや！
    console.debug("selected" + selected);

    const handleSetSelected = (issue: Case) => {
        // console.log("issue", issue);
        setSelected(issue);

        //react-router-domを用いて、URLを変更する。
        navigate("/determine_lend/select/" + issue.id);
    };

    return (
        <>
            <PageTitle
                title={"貸出数の確定"}
                backButton={{ text: "ホーム", link: "/dashboard/default" }}
            />
            <MainCard_ts>
                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to={"/survey/firstform/done"}
                    key={"/survey/firstform/done"}
                >
                    貸出完了
                </Link>
                <h3>案件の選択</h3>

                <h4>一覧から選択する</h4>
                <CaseTable selectBtn setValue={handleSetSelected} />
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
