import Typography from "@mui/material/Typography";

import shovelsvg from "./shovel.svg";
import shovelWhite from "./shovel-white.svg";

type LogoProps = {
    colorMode?: boolean;
};

export default function Logo(props: LogoProps) {
    const { colorMode } = props;
    return (
        <>
            <img
                src={colorMode ? shovelWhite : shovelsvg}
                alt="logo"
                width="25"
                height="25"
                style={{ marginRight: "10px" }}
            />
            <Typography
                variant="h6"
                noWrap
                sx={{
                    display: { xs: "none", md: "flex" },
                    fontFamily: "Noto Sans JP",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                K-Lend
            </Typography>
        </>
    );
}
