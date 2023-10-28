import { Home, Info } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import About from "./pages/About";
import ReturnEmpty from "./pages/ReturnEmptyPage";

interface Page {
    href: string;
    text: string;
    iconName: React.ElementType<SvgIconProps>;

    element: JSX.Element;

    /*ドロワーにボタンを表示するか */
    isDrawerButton: boolean;
}

// PagesはPageのArray
type Pages = Page[];

export const lists: Pages = [
    {
        href: "/",
        text: "Home",
        iconName: Home,
        element: <Home />,
        isDrawerButton: true,
    },
    {
        href: "/about",
        text: "About",
        iconName: Info,
        element: <About />,
        isDrawerButton: true,
    },
    {
        href: "/users",
        text: "Users",
        iconName: Info,
        element: <ReturnEmpty text="Users" />,
        isDrawerButton: true,
    }
]
