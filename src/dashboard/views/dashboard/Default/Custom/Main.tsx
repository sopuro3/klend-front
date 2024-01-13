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

            <MainCard_ts sx={{ minHeight: "400px" }}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </MainCard_ts>
        </>
    );
}
