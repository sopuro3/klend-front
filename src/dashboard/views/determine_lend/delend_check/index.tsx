import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

export default function DeLend_Shikizai() {
    return (
        <>
            <PageTitle title={"入力内容の確認"} />

            <MainCard_ts>
                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to={"/survey/firstform/done"}
                    key={"/survey/firstform/done"}
                >
                    <Typography variant="h4" component="div">
                        確定
                    </Typography>
                </Link>

                {/* <BasicDatePicker /> */}
                {/* 日付型を入力できるインプット欄を用意する */}
            </MainCard_ts>
        </>
    );
}
