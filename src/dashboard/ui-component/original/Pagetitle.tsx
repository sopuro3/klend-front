import { Card, Grid, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";

//@ts-expect-error jsxなので
import { gridSpacing } from "@/dashboard/store/constant";

type TitleProps = {
    title: string;
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
                }}
                // {...others}
            >
                <Box sx={{ p: 2, pl: 2 }}>
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
            </Card>
        </>
    );
}
