import { Info, Home as HomeIcon } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import Recep_home from "./pages/home/Recep_home.tsx";
import Error401 from "../pages/other/error/Error401.tsx";
import 返却時のナンバー入力画面 from "./pages/return/Return_Input.tsx";
import 返却フォームの資機材入力画面 from "./pages/return/return_setitem/Return_Shikizai.tsx";
import Return_complete from "./pages/return/return_comp/Return_complete.tsx";

export interface Page {
    href: string;
    text: string;
    iconName: React.ElementType<SvgIconProps>;
    element: JSX.Element;
    /*ドロワーにボタンを表示するか */
    isDrawerButton: boolean;
    subPages?: Page[];
}

// PagesはPageのArray
export type Pages = Page[];

/**
 * これをいじって、ページ一覧を設定できる
 */
export const lists: Pages = [
    {
        href: "/",
        text: "利用者向けホーム",
        iconName: HomeIcon,
        element: <Recep_home />,
        isDrawerButton: true,
        subPages: [
            {
                href: "/reception/return",
                text: "返却受付",
                iconName: Info,
                element: <返却時のナンバー入力画面 />,
                isDrawerButton: true,
                subPages: [
                    {
                        href: "/reception/return/select/:id",
                        text: "返却数編集",
                        iconName: Info,
                        element: <返却フォームの資機材入力画面 />,
                        isDrawerButton: true,
                        subPages: [
                            {
                                href: "/reception/return/done",
                                text: "返却完了",
                                iconName: Info,
                                element: <Return_complete />,
                                isDrawerButton: true,
                            },
                        ],
                    },
                ],
            },

            {
                href: "/401",
                text: "エラー:使用済みQRコード",
                iconName: Info,
                element: <Error401 />,
                isDrawerButton: true,
            },
        ],
    },
];
