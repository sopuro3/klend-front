import { Info, Home as HomeIcon, Home } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

import ReturnEmpty from './pages/ReturnEmptyPage';
import About from './pages/NormAbout';

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
        text: 'Home',
        iconName: HomeIcon,
        element: <Home />,
        isDrawerButton: true,
    },
    {
        href: '/about',
        text: 'About',
        iconName: Info,
        element: <About />,
        isDrawerButton: true,
    },
    {
        href: '/users',
        text: 'Users',
        iconName: Info,
        element: <ReturnEmpty text="Users" />,
        isDrawerButton: true,
    },
];
