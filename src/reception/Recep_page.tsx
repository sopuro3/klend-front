import { Info, Home as HomeIcon } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import ReturnEmpty from '../pages/ReturnEmptyPage.tsx';
import Recep_home from './pages/home/Recep_home.tsx';
import Borrow from './pages/borrow/Borrow.tsx';
import Borrow_complete from './pages/borrow_comp/Borrow_complete.tsx';
import Error401 from '../pages/other/error/Error401.tsx';

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
        href: '/',
        text: '利用者向けホーム',
        iconName: HomeIcon,
        element: <Recep_home />,
        isDrawerButton: true,
        subPages: [
            {
                href: '/reception/borrow',
                text: '貸出受付',
                iconName: Info,
                element: <Borrow />,
                isDrawerButton: true,
                subPages: [
                    {
                        href: '/reception/borrow/check',
                        text: '貸出数量確認',
                        iconName: Info,
                        element: <ReturnEmpty text="貸出数量" />,
                        isDrawerButton: true,
                    },
                    {
                        href: '/reception/borrow/done',
                        text: '貸出完了',
                        iconName: Info,
                        element: <Borrow_complete />,
                        isDrawerButton: true,
                    },
                ],
            },
            {
                href: '/reception/return',
                text: '返却受付',
                iconName: Info,
                element: <ReturnEmpty text="返却" />,
                isDrawerButton: true,
                subPages: [
                    {
                        href: '/reception/return/check',
                        text: '返却数量確認',
                        iconName: Info,
                        element: <ReturnEmpty text="返却数量" />,
                        isDrawerButton: true,
                    },
                ],
            },
            {
                href:"/401",
                text:"エラー:使用済みQRコード",
                iconName:Info,
                element:<Error401/>,
                isDrawerButton:true,

            }
        ],
    },
];
