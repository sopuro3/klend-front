import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Grid,
    Stack,
    Typography,
    useMediaQuery,
    ButtonBase,
} from "@mui/material";

// project imports
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "@/ui-component/Logo";
import AuthFooter from "@/dashboard/ui-component/cards/AuthFooter";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AuthWrapper1>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: "calc(100vh - 68px)" }}
                    >
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item sx={{ mb: 3 }}>
                                        <ButtonBase
                                            component={Link}
                                            style={{ display: "flex" }}
                                            to="#"
                                        >
                                            <Logo />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack
                                            alignItems="center"
                                            justifyContent="center"
                                            spacing={1}
                                        >
                                            <Typography
                                                color={
                                                    theme.palette.secondary.main
                                                }
                                                gutterBottom
                                                variant={
                                                    matchDownSM ? "h3" : "h2"
                                                }
                                            >
                                                K-Lend 職員用
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                fontSize="16px"
                                                textAlign={
                                                    matchDownSM
                                                        ? "center"
                                                        : "inherit"
                                                }
                                            >
                                                K-Lendにサインイン
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
