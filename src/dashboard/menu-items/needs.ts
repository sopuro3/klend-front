import TourIcon from "@mui/icons-material/Tour";
// constant
const icons = {
    TourIcon,
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
            breadcrumbs: true,
            url: "/survey/firstForm",
        },
    ],
};

export default needs;
