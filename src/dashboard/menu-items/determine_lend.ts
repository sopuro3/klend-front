import AssignmentIcon from "@mui/icons-material/Assignment";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// constant
const icons = {
    KeyboardReturnIcon,
    AssignmentIcon,
    OpenInNewIcon,
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
            title: "資器材の返却" + OpenInNewIcon,
            type: "item",
            icon: icons.KeyboardReturnIcon,
            breadcrumbs: false,
            target: true,

            // urlは、rootにする
            url: location.protocol + "//" + location.host + "/reception/return",
        },
    ],
};

export default lends;
