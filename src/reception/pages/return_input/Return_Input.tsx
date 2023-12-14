import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function 返却時のナンバー入力画面() {
    return (
        <>
            <h3>受付番号の入力</h3>
            <p>
                書類に記されている受付ナンバーとパスワードを入力してください。
            </p>

            <Card
                sx={{
                    maxWidth: 400,
                    margin: "auto",
                    padding: "10px",
                    background: "#f8f8f8",
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        受付番号
                    </Typography>
                    <App />
                </CardContent>
            </Card>
        </>
    );
}

import { useForm } from "react-hook-form";

type FormValues = {
    number: number;
    password: string;
};

function App() {
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => console.log(data);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };
    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        label="4桁の受付No."
                        type="number"
                        variant="outlined"
                        {...register("number")}
                        sx={{ marginBottom: "10px", width: "100%" }}
                    />

                    <FormControl
                        sx={{ width: "100%", marginBottom: "10px" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            パスワード
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="パスワード"
                        />
                    </FormControl>
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ marginLeft: "auto" }}
                        >
                            決定
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
