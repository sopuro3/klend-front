import { Card, CardContent, Typography } from "@mui/material";

export default function 返却フォームの資器材入力画面() {
    return (
        <>
            <h3>受付番号の入力</h3>
            <p>
                書類に記されている受付ナンバーとパスワードを入力してください。
            </p>

            <Card
                sx={{
                    maxWidth: 400,
                    margin: "auto",
                    padding: "10px",
                    background: "#f8f8f8",
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        受付番号
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}