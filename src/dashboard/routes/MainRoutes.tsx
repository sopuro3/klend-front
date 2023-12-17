import { lazy } from "react";

// project imports
//@ts-expect-error jsxなので
import MainLayout from "@/dashboard/layout/MainLayout";
//@ts-expect-error jsxなので
import Loadable from "@/dashboard/ui-component/Loadable";
import CasePage from "@/components/Case_Detail/Case_Page";

// dashboard routing
const DashboardDefault = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/dashboard/Default")),
);

// utilities routing
const UtilsTypography = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/utilities/Typography")),
);
const UtilsColor = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/utilities/Color")),
);
const UtilsShadow = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/utilities/Shadow")),
);
const UtilsMaterialIcons = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/utilities/MaterialIcons")),
);
const UtilsTablerIcons = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/utilities/TablerIcons")),
);

// sample page routing
const SamplePage = Loadable(
    //@ts-expect-error jsxなので
    lazy(() => import("@/dashboard/views/sample-page")),
);

const Survey = Loadable(lazy(() => import("@/dashboard/views/firstForm")));

const Survey_Done = Loadable(
    lazy(() => import("@/dashboard/views/firstForm/done")),
);

const Caselist = Loadable(
    lazy(() => import("@/dashboard/views/firstForm/caselist")),
);

const Determine_lend = Loadable(
    lazy(() => import("@/dashboard/views/determine_lend")),
);

const Stocklist = Loadable(lazy(() => import("@/dashboard/views/stocklist")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            element: <DashboardDefault />,
        },
        {
            path: "dashboard",
            children: [
                {
                    path: "default",
                    element: <DashboardDefault />,
                },
            ],
        },
        {
            path: "utils",
            children: [
                {
                    path: "util-typography",
                    element: <UtilsTypography />,
                },
            ],
        },
        {
            path: "utils",
            children: [
                {
                    path: "util-color",
                    element: <UtilsColor />,
                },
            ],
        },
        {
            path: "utils",
            children: [
                {
                    path: "util-shadow",
                    element: <UtilsShadow />,
                },
            ],
        },
        {
            path: "icons",
            children: [
                {
                    path: "tabler-icons",
                    element: <UtilsTablerIcons />,
                },
            ],
        },
        {
            path: "icons",
            children: [
                {
                    path: "material-icons",
                    element: <UtilsMaterialIcons />,
                },
            ],
        },
        {
            path: "sample-page",
            element: <SamplePage />,
        },

        {
            path: "survey",
            children: [
                {
                    path: "firstForm",
                    element: <Survey />,
                },
            ],
        },
        {
            path: "survey",
            children: [
                {
                    path: "firstForm/done",
                    element: <Survey_Done />,
                },
            ],
        },
        {
            path: "survey",
            children: [
                {
                    path: "caselist",
                    element: <Caselist></Caselist>,
                },
            ],
        },
        {
            path: "survey",
            children: [
                {
                    path: "caselist",
                    element: <Caselist></Caselist>,
                },
            ],
        },
        {
            path: "case/:id",
            element: <CasePage></CasePage>,
        },
        {
            path: "equipment/:id",
            element: <CasePage></CasePage>,
        },
        {
            path: "determine_lend",
            element: <Determine_lend></Determine_lend>,
        },
        {
            path: "stocklist",
            element: <Stocklist></Stocklist>,
        },
    ],
};

export default MainRoutes;
