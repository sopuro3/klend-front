import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";
// import { Grid } from "@mui/material";
// import { useTheme } from "@mui/system";
import "./Main.css";
export default function Main() {
    // const theme = useTheme();

    return (
        <>
            <PageTitle title="K-Lend ホーム" />

            <MainCard_ts sx={{ minHeight: "680px" }}>
                <p>ここになにかを書きたい</p>
            </MainCard_ts>
        </>
    );
}
