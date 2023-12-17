import AssignmentIcon from "@mui/icons-material/Assignment";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// constant
const icons = {
    KeyboardReturnIcon,
    AssignmentIcon,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const lends = {
    id: "lends_returns",
    title: "資器材の貸し出し",
    type: "group",
    children: [
        {
            id: "determine_Lend",
            title: "貸し出し数量の確定",
            type: "item",
            icon: icons.AssignmentIcon,
            breadcrumbs: false,
            url: "/survey/firstForm",
        },
        {
            id: "jump_to_return",
            title: "資器材の返却",
            type: "item",
            icon: icons.KeyboardReturnIcon,
            breadcrumbs: false,
            target: true,
            
            url: "/survey/firstForm",
        },
    ],
};

export default lends;
