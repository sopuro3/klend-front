import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

//@ts-expect-error JSXより
import TotalGrowthBarChart from "./TotalGrowthBarChart";
//@ts-expect-error JSXより
import { gridSpacing } from "@/dashboard/store/constant";
// import { NormWidget } from "./WidgetBtn";
// import { blue } from "@mui/material/colors";
import Notice from "./Custom/Notice";
// ==============================|| DEFAULT DASHBOARD ||============================== //

// type NormWidgetItem = {
//     Title: string;
//     ThemeColor: string;
//     Icon: React.ReactNode;
//     Description: string;
// };

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <NormWidget isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Notice />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
