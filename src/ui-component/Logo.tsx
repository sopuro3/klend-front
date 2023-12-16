import Typography from "@mui/material/Typography";
import { EventNote } from "@mui/icons-material";

export default function Logo() {
    return (
        <>
            <EventNote sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "Noto Sans JP",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                K-Lend
            </Typography>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    fontFamily: "Noto Sans JP",
                    letterSpacing: ".rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                (仮)
            </Typography>
        </>
    );
}
