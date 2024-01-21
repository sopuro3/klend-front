import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function Recep_home() {
    return (
        <>
            <h3>デバッグ用リンク</h3>
            <p>
                このページは使われなくなり、通常時はたどり着くことを想定していませんが、フロントエンドの開発時に必要であるため各部へのリンクを残しています。
            </p>
            <p>
                <Link
                    component={RouterLink}
                    to="/reception/return/select/13590"
                >
                    一般用返却ページ
                </Link>
            </p>
            <p>
                <Link href="/dashboard/dashboard/default">
                    職員向けダッシュボード
                </Link>
            </p>
        </>
    );
}
