import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SubjectIcon from "@mui/icons-material/Subject";
// constant
const icons = {
    SubjectIcon,
    AppRegistrationIcon,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const manage_stock = {
    id: "manage_stock",
    title: "資器材個数の管理",
    type: "group",
    children: [
        {
            id: "stockStatus",
            title: "在庫状況の確認",
            type: "item",
            icon: icons.SubjectIcon,
            breadcrumbs: false,
            url: "/survey/firstForm",
        },
        {
            id: "addOrDelete_stock",
            title: "物品の追加・削除",
            type: "item",
            icon: icons.AppRegistrationIcon,
            breadcrumbs: false,
            url: "/survey/caselist",
        },
    ],
};

export default manage_stock;
