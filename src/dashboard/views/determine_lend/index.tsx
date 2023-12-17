import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Borrow() {
    return (
        <>
            <PageTitle title={"貸出数の確定"} />

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
                <BasicDatePicker />
                {/* 日付型を入力できるインプット欄を用意する */}
            </MainCard_ts>
        </>
    );
}

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
// https://mui.com/x/react-date-pickers/date-picker/
//ここより取得。フォームではこういうのが役に立つ。
export function BasicDatePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
                <DatePicker label="日付を選択" format="YYYY-MM-DD" />
            </DemoContainer>
        </LocalizationProvider>
    );
}
