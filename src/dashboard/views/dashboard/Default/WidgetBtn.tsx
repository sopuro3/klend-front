// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

// project imports
//@ts-expect-error JSXより
import MainCard from "@/dashboard/ui-component/cards/MainCard";

// assets
import EarningIcon from "@/dashboard/assets/images/icons/earning.svg";

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: "#fff",
    overflow: "hidden",
    position: "relative",
}));

// type widgetProps = {
//     isLoading: boolean;
// };

export const NormWidget = (/*props: widgetProps*/) => {
    const theme = useTheme();

    return (
        <>
            <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            //@ts-expect-error Theme関連はいじりたくない
                                            ...theme.typography.commonAvatar,
                                            //@ts-expect-error Theme関連はいじりたくない
                                            ...theme.typography.largeAvatar,
                                            backgroundColor:
                                                //@ts-expect-error Theme関連はいじりたくない
                                                theme.palette.secondary[800],
                                            mt: 1,
                                        }}
                                    >
                                        <img
                                            src={EarningIcon}
                                            alt="Notification"
                                        />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontSize: "2.125rem",
                                            fontWeight: 500,
                                            mr: 1,
                                            mt: 1.75,
                                            mb: 0.75,
                                        }}
                                    >
                                        ボランティア案件の新規作成
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    //@ts-expect-error Theme関連はいじりたくない
                                    color: theme.palette.secondary[200],
                                }}
                            >
                                Total Earning
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
        </>
    );
};
