import { lazy } from "react";

// project imports
//@ts-expect-error jsxなので
import MainLayout from "@/dashboard/layout/MainLayout";
//@ts-expect-error jsxなので
import Loadable from "@/dashboard/ui-component/Loadable";
import { IssuePage } from "@/components/Issue_Detail/Issue_Page";

// dashboard routing
const DashboardDefault = Loadable(
    lazy(() => import("@/dashboard/views/dashboard/Default/index")),
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

const Survey = Loadable(lazy(() => import("@/dashboard/views/survey")));

const Survey_Done = Loadable(
    lazy(() => import("@/dashboard/views/survey/done")),
);

const IssueList = Loadable(
    lazy(() => import("@/dashboard/views/survey/issuelist")),
);

const Determine_lend = Loadable(
    lazy(() => import("@/dashboard/views/determine_lend")),
);

const Determine_select = Loadable(
    lazy(() => import("@/dashboard/views/determine_lend_select")),
);

const AccountManagement = Loadable(
    lazy(() => import("@/dashboard/views/account_manage")),
);

const Manage_stock = Loadable(
    lazy(() => import("@/dashboard/views/manage_stock")),
);

const Determine_lend_done = Loadable(
    lazy(() => import("@/dashboard/views/determine_lend_done")),
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
                    path: "issuelist",
                    element: <IssueList></IssueList>,
                },
            ],
        },
        {
            path: "survey",
            children: [
                {
                    path: "issuelist",
                    element: <IssueList></IssueList>,
                },
            ],
        },
        {
            path: "survey",

            children: [
                {
                    path: "manage_stock",
                    element: <Manage_stock></Manage_stock>,
                },
            ],
        },
        {
            path: "issue/:id",
            element: <IssuePage></IssuePage>,
        },
        {
            path: "equipment/:id",
            element: <IssuePage></IssuePage>,
        },
        {
            path: "determine_lend",
            element: <Determine_lend></Determine_lend>,
        },
        {
            path: "determine_lend",
            children: [
                {
                    path: "select/:id",
                    element: <Determine_select></Determine_select>,
                },
            ],
        },
        {
            path: "determine_lend",
            children: [
                {
                    path: "done/:id",
                    element: <Determine_lend_done></Determine_lend_done>,
                },
            ],
        },
        {
            path: "stocklist",
            element: <Stocklist></Stocklist>,
        },
        {
            path: "manage_account",
            element: <AccountManagement></AccountManagement>,
        },
    ],
};

export default MainRoutes;
