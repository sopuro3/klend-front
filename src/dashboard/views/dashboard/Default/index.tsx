import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import Typography from "@mui/material/Typography";
// import { useEffect, useState } from "react";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    // const [isLoading, setLoading] = useState(true);
    // useEffect(() => {
    //     setLoading(false);
    // }, []);

    return (
        <MainCard_ts>
            <h1>お知らせ</h1>
            <Typography variant="h4" component="div">
                ここにお知らせを表示する
            </Typography>
            <br />
            <h1>アップデート情報</h1>
            <Typography variant="h4" component="div">
                ここにアップデート情報を表示する
            </Typography>
        </MainCard_ts>
    );
};

export default Dashboard;
