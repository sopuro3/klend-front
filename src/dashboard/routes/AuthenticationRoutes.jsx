import { lazy } from "react";

// project imports
import Loadable from "@/dashboard/ui-component/Loadable";
import MinimalLayout from "@/dashboard/layout/MinimalLayout";

// login option 3 routing
const AuthLogin3 = Loadable(
    lazy(() =>
        import("@/dashboard/views/pages/authentication/authentication3/Login3"),
    ),
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: "/",
    element: <MinimalLayout />,
    children: [
        {
            path: "/pages/login/login3",
            element: <AuthLogin3 />,
        },
    ],
};

export default AuthenticationRoutes;
