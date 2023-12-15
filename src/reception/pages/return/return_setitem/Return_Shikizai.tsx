import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function 返却フォームの資器材入力画面() {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <h3>返却した資機材の数量確認</h3>
            <p>
                破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
            </p>
            <p>ダイナミックルーティングのid表示:{id}</p>
            <p>ここにテーブルコンポーネントが入ります</p>
            <div style={{ display: "flex" }}>
                <Button
                    variant="contained"
                    to={"/reception/return/done"}
                    key={"/reception/return/done"}
                    component={RouterLink}
                    sx={{ marginLeft: "auto" }}
                >
                    送信
                </Button>
            </div>
        </>
    );
}
