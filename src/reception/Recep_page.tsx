import { Info, Home as HomeIcon } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import ReturnEmpty from "../pages/ReturnEmptyPage.tsx";
import Recep_home from "./pages/Recep_home.tsx";
import BreadCrumb from "./BreadCrumb.tsx";
import Borrow from "./pages/Borrow.tsx";

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
        element: <>
        <BreadCrumb></BreadCrumb>
        <Recep_home />
        </>,
        isDrawerButton: true,
        subPages: [
            {
                href: "reception/borrow",
                text: "貸出受付",
                iconName: Info,
                element: <>
                <BreadCrumb></BreadCrumb>
                <Borrow />
                </>,
                isDrawerButton: true,
                subPages: [

                    {
                        href: "reception/borrow/check",
                        text: "貸出数量確認",
                        iconName: Info,
                        element: <>
                        <BreadCrumb></BreadCrumb>
                        <ReturnEmpty text="貸出数量" />
                        </>,
                        isDrawerButton: true,
                    }
                ]
                
            },
            {
                href: "reception/return",
                text: "返却受付",
                iconName: Info,
                element: <>
                <BreadCrumb></BreadCrumb>
                <ReturnEmpty text="返却" />
                </>,
                isDrawerButton: true,
                subPages: [

                    {
                        href: "reception/return/check",
                        text: "返却数量確認",
                        iconName: Info,
                        element: <>
                        <BreadCrumb></BreadCrumb>
                        <ReturnEmpty text="返却数量" />
                        </>,
                        isDrawerButton: true,
                    }
                ]
                
            },
        ]
    },

]
