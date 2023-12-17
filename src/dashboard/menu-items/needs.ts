import TourIcon from "@mui/icons-material/Tour";
import ListIcon from "@mui/icons-material/List";

// constant
const icons = {
    TourIcon,
    ListIcon,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const needs = {
    id: "needs",
    title: "ボランティア案件調査",
    type: "group",
    children: [
        {
            id: "createNewNeeds",
            title: "案件の新規作成",
            type: "item",
            icon: icons.TourIcon,
            breadcrumbs: false,
            url: "/survey/firstForm",
        },
        {
            id: "viewAllNeeds",
            title: "登録済み案件の一覧",
            type: "item",
            icon: icons.ListIcon,
            breadcrumbs: false,
            url: "/survey/caselist",
        },
    ],
};

export default needs;
