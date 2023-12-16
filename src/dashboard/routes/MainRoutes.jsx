import { lazy } from "react";

// project imports
import MainLayout from "@/dashboard/layout/MainLayout";
import Loadable from "@/dashboard/ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
    lazy(() => import("@/dashboard/views/dashboard/Default")),
);

// utilities routing
const UtilsTypography = Loadable(
    lazy(() => import("@/dashboard/views/utilities/Typography")),
);
const UtilsColor = Loadable(
    lazy(() => import("@/dashboard/views/utilities/Color")),
);
const UtilsShadow = Loadable(
    lazy(() => import("@/dashboard/views/utilities/Shadow")),
);
const UtilsMaterialIcons = Loadable(
    lazy(() => import("@/dashboard/views/utilities/MaterialIcons")),
);
const UtilsTablerIcons = Loadable(
    lazy(() => import("@/dashboard/views/utilities/TablerIcons")),
);

// sample page routing
const SamplePage = Loadable(
    lazy(() => import("@/dashboard/views/sample-page")),
);


const Survey = Loadable(
    lazy(() => import("@/dashboard/views/firstForm")),
);



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
            path:"survey",
            children:[
                {
                    path:"firstForm",
                    element:<Survey/>
                }
            ]
        }
        
    ],
};

export default MainRoutes;
