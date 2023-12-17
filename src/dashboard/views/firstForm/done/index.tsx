import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import DoneMark from "../../../../reception/components/checkmark/Checkmark";
import "./borrow_complete.css";
import { Card, CardContent, Typography } from "@mui/material";

export default function Borrow_complete() {
    return (
        <>
            <MainCard_ts>
                <DoneMark></DoneMark>
                <div className="text-container">手続きが完了しました！</div>
                <br></br>
                <Card
                    sx={{
                        maxWidth: 300,
                        margin: "auto",
                        padding: "10px",
                        background: "#f8f8f8",
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            受付番号
                        </Typography>
                        <Typography variant="h4">3218</Typography>
                        <Typography>この受付番号を控えてください。</Typography>
                    </CardContent>
                </Card>
            </MainCard_ts>
        </>
    );
}
