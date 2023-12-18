import { Card, CardContent, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";

export default function 貸出時のナンバー入力画面() {
    return (
        <>
            <MainCard_ts>
                <h3>受付番号の入力</h3>
                <p>書類に記されている受付ナンバーを入力してください。</p>

                <Card
                    sx={{
                        maxWidth: 400,
                        margin: "auto",
                        padding: "10px",
                        background: "#f8f8f8",
                    }}
                >
                    <CardContent>
                        <Typography variant="h4" component="div">
                            受付番号
                        </Typography>
                    </CardContent>
                </Card>

                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to={"/determine_lend/delend_Shikizai"}
                    key={"/determine_lend/delend_Shikizai"}
                >
                    <Typography variant="h4" component="div">
                        入力内容の確認
                    </Typography>
                </Link>

                {/* <BasicDatePicker /> */}
                {/* 日付型を入力できるインプット欄を用意する */}
            </MainCard_ts>
        </>
    );
}
