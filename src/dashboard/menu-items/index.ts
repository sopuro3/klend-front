//@ts-expect-error これは最初から読まれていたやつ
import { IconDashboard, IconKey } from "@tabler/icons";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SubjectIcon from "@mui/icons-material/Subject";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TourIcon from "@mui/icons-material/Tour";
import ListIcon from "@mui/icons-material/List";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const icons = {
    IconDashboard: IconDashboard,
    IconKey: IconKey,
    OpenInNewIcon: OpenInNewIcon,
    KeyboardReturnIcon: KeyboardReturnIcon,
    AppRegistrationIcon: AppRegistrationIcon,
    SubjectIcon: SubjectIcon,
    TourIcon: TourIcon,
    ListIcon: ListIcon,
    AssignmentIcon: AssignmentIcon,
    ManageAccountsIcon: ManageAccountsIcon,
};

// ==============================|| MENU ITEMS ||============================== //

// const menuItems = {
//     items: [dashboard, needs, lends, manage_stock, pages],
// };

const menuItems = {
    items: [
        {
            id: "dashboard",
            type: "group",
            children: [
                {
                    id: "default",
                    title: "ホーム",
                    type: "item",
                    url: "/dashboard/default",
                    icon: IconDashboard,
                    breadcrumbs: false,
                },
            ],
        },
        {
            id: "needs",
            title: "ボランティア案件調査",
            type: "group",
            children: [
                {
                    id: "createNewNeeds",
                    title: "案件の新規作成",
                    type: "item",
                    icon: TourIcon,
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
        },
        {
            id: "lends_returns",
            title: "資機材の貸し出し",
            type: "group",
            children: [
                {
                    id: "determine_Lend",
                    title: "貸し出し数量の確定",
                    type: "item",
                    icon: icons.AssignmentIcon,
                    breadcrumbs: false,
                    url: "/determine_lend",
                },
                {
                    id: "jump_to_return",
                    title: "資機材の返却",
                    type: "item",
                    icon: OpenInNewIcon,
                    breadcrumbs: false,
                    target: true,

                    // urlは、rootにする
                    url:
                        location.protocol +
                        "//" +
                        location.host +
                        "/reception/return",
                },
            ],
        },
        {
            id: "manage_stock",
            title: "資機材個数の管理",
            type: "group",
            children: [
                {
                    id: "stockStatus",
                    title: "在庫状況の確認",
                    type: "item",
                    icon: icons.SubjectIcon,
                    breadcrumbs: false,
                    url: "/stocklist",
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
        },
        {
            id: "pages",
            title: "Pages",
            caption: "Pages Caption",
            type: "group",
            children: [
                {
                    id: "authentication",
                    title: "その他",
                    type: "collapse",

                    children: [
                        {
                            id: "login3",
                            title: "Login",
                            type: "item",
                            url: "/pages/login/login3",
                            icon: icons.IconKey,

                            target: true,
                        },
                        {
                            id: "Account",
                            title: "アカウント管理",
                            type: "item",
                            url: "manage_account",
                            icon: icons.ManageAccountsIcon,
                        },
                    ],
                },
            ],
        },
    ],
};

export default menuItems;
