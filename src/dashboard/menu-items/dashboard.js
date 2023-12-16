// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: "dashboard",
    type: "group",
    children: [
        {
            id: "default",
            title: "ホーム",
            type: "item",
            url: "/dashboard/default",
            icon: icons.IconDashboard,
            breadcrumbs: false,
        },
    ],
};

export default dashboard;
