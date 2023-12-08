import { Info, Home as HomeIcon } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

import ReturnEmpty from "./pages/ReturnEmptyPage";
import About from "./pages/NormAbout";
import Home from "./pages/NormHome";

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
        href: "/dashboard",
        text: "Home",
        iconName: HomeIcon,
        element: <Home />,
        isDrawerButton: true,
    },
    {
        href: "/dashboard/about",
        text: "About",
        iconName: Info,
        element: <About />,
        isDrawerButton: true,
    },
    {
        href: "/dashboard/users",
        text: "Users",
        iconName: Info,
        element: <ReturnEmpty text="Users" />,
        isDrawerButton: true,
    },
];
