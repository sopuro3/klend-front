import { CallTable } from "@/components/Shikizai-Table/Shikizai_Table";
import { Button } from "@mui/material";

export default function 返却フォームの資器材入力画面() {
    return (
        <>
            <h3>返却した資機材の数量確認</h3>
            <p>
                破損・紛失した資機材は除き、返却した資機材の数量を確認してください。
            </p>
            <p>ここにテーブルコンポーネントが入ります</p>

            <CallTable></CallTable>

            <div style={{ display: "flex" }}>
                <Button
                    variant="contained"
                    href="/reception/return/done"
                    sx={{ marginLeft: "auto" }}
                >
                    送信
                </Button>
            </div>
        </>
    );
}
