
import TourIcon from '@mui/icons-material/Tour';
// constant
const icons = {
    TourIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const needs = {
    id: "needs",
    title: "ニーズ班",
    caption: "資器材調査用",
    type: "group",
    children: [
        {
            id: "createNewNeeds",
            title: "案件の新規作成",
            type: "collapse",
            icon: icons.TourIcon,
            breadcrumbs: true,
            url: "/dashboard/needsForm",


        },
    ],
};

export default needs;
