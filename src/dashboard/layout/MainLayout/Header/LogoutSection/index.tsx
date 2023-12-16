// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

// assets
//@ts-expect-error: any黙らせ
import { IconLogout } from "@tabler/icons";

// ==============================|| NOTIFICATION ||============================== //

const LogoutSection = () => {
    const theme = useTheme();
    const handleLogout = async () => {
        console.log("Logout");
    };

    return (
        <Box
            sx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down("md")]: {
                    mr: 2,
                },
            }}
        >
            <Button
                variant="contained"
                startIcon={<IconLogout stroke={1.5} size="1.3rem" />}
                sx={{
                    transition: "all .2s ease-in-out",
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                }}
                onClick={handleLogout}
                color="inherit"
            >
                <Typography variant="body2">Logout</Typography>
            </Button>
        </Box>
    );
};

export default LogoutSection;
