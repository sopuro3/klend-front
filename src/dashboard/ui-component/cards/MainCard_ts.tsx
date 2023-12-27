import PropTypes from "prop-types";
import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@mui/material";

// constant
const headerSX = {
    "& .MuiCardHeader-action": { mr: 0 },
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

type MainCardProps = {
    children: React.ReactNode;
    sx?: object;
};

const MainCard_ts: React.FC<MainCardProps> = forwardRef(
    (
        {
            //@ts-expect-error jsxからの変換。何も考えたくない
            border = true,
            //@ts-expect-error jsxからの変換。何も考えたくない
            boxShadow,
            children,
            //@ts-expect-error jsxからの変換。何も考えたくない
            content = true,
            //@ts-expect-error jsxからの変換。何も考えたくない
            contentClass = "",
            //@ts-expect-error jsxからの変換。何も考えたくない
            contentSX = {},
            //@ts-expect-error jsxからの変換。何も考えたくない
            darkTitle,
            //@ts-expect-error jsxからの変換。何も考えたくない
            secondary,
            //@ts-expect-error jsxからの変換。何も考えたくない
            shadow,
            sx = {},
            //@ts-expect-error jsxからの変換。何も考えたくない
            title,
            ...others
        },
        ref,
    ) => {
        const theme = useTheme();

        return (
            //@ts-expect-error jsxからの変換。何も考えたくない

            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? "1px solid" : "none",
                    //@ts-expect-error jsxからの変換。何も考えたくない

                    borderColor: theme.palette.primary[200] + 25,
                    ":hover": {
                        boxShadow: boxShadow
                            ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)"
                            : "inherit",
                    },
                    ...sx,
                }}
            >
                {/* card header and action */}
                {title && (
                    <CardHeader
                        sx={headerSX}
                        title={
                            darkTitle ? (
                                <Typography variant="h3">{title}</Typography>
                            ) : (
                                title
                            )
                        }
                        action={secondary}
                    />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    },
);
MainCard_ts.displayName = "MainCard";

MainCard_ts.propTypes = {
    //@ts-expect-error jsxからの変換。何も考えたくない

    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.object,
    ]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default MainCard_ts;
