import { Button, Card, Grid, Link, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//@ts-expect-error jsxなので
import { gridSpacing } from "@/dashboard/store/constant";
export type BackButton = {
    link?: string;
    text?: string;
};

export type FuncButton = {
    func: () => void;
    text: string;
};

type TitleProps = {
    title: string;

    backButton?: BackButton;
    funcButton?: FuncButton;
};

export default function PageTitle(props: TitleProps) {
    const theme = useTheme();
    let navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }

    return (
        <>
            <Card
                sx={{
                    marginBottom: theme.spacing(gridSpacing),
                    border: "1px solid",
                    borderColor: theme.palette.primary[200] + 75,
                    background: theme.palette.background.default,
                    display: "flex",
                }}
                // {...others}
            >
                <Box sx={{ p: 2, pl: 2, flexGrow: 1 }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        {props.title && (
                            <Grid item>
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {props.title}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
                <Box sx={{ p: 2, pl: 2 }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        {props.backButton && (
                            <Grid item>
                                {/* <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 500 }}
                                >
                                    {props.title}
                                </Typography> */}
                                {props.backButton.link ? (
                                    <Link
                                        component={RouterLink}
                                        underline="hover"
                                        color="inherit"
                                        to={props.backButton.link}
                                        key={props.backButton.link}
                                    >
                                        <Button color="primary">
                                            {(props.backButton.text
                                                ? props.backButton.text + "に"
                                                : "") + "戻る"}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        onClick={goBack}
                                    >
                                        <Button color="primary">戻る</Button>
                                    </Link>
                                )}
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Card>
        </>
    );
}
