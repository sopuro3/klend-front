import { Info, Home as HomeIcon } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import About from "../pages/About.tsx";
import ReturnEmpty from "../pages/ReturnEmptyPage.tsx";
import Recep_home from "./pages/Recep_home.tsx";

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
        text: "入力",
        iconName: HomeIcon,
        element: <Recep_home />,
        isDrawerButton: true,
        subPages: [
            {
                href: "reception/main",
                text: "受付",
                iconName: Info,
                element: <About />,
                isDrawerButton: true,
                subPages: [

                    {
                        href: "/users",
                        text: "Users",
                        iconName: Info,
                        element: <ReturnEmpty text="Users" />,
                        isDrawerButton: true,
                    }
                ]
            },
        ]
    },

]
