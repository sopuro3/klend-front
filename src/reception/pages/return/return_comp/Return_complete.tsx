import DoneMark from "../../../../components/checkmark/Checkmark";
import "../../../../components/checkmark/borrow_complete.css";

// import { Card, CardContent, Typography } from "@mui/material";

export default function Return_complete() {
    return (
        <>
            <DoneMark></DoneMark>
            <div className="text-container">返却手続きが完了しました。</div>
            <p>ご協力ありがとうございました。</p>
            <br></br>
            {/* <Card
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
            </Card> */}
        </>
    );
}
