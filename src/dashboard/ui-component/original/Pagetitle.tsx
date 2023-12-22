import { Button, Card, Grid, Link, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
//@ts-expect-error jsxなので
import { gridSpacing } from "@/dashboard/store/constant";
export type BackButton = {
    link: string;
    text: string;
};

type TitleProps = {
    title: string;

    backButton?: {
        link: string;
        text: string;
    };
};

export default function PageTitle(props: TitleProps) {
    const theme = useTheme();

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
                                <Link
                                    component={RouterLink}
                                    underline="hover"
                                    color="inherit"
                                    to={props.backButton.link}
                                    key={props.backButton.link}
                                >
                                    <Button variant="contained" color="primary">
                                        {props.backButton.text + "に戻る"}
                                    </Button>
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Card>
        </>
    );
}
