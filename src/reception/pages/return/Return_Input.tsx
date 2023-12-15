import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Return_input.css";
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
import { Link as RouterLink } from "react-router-dom";

type FormValues = {
    number: string;
    password: string;
};

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        console.log(data);
        //もし、numberが4桁の数字以外であれば、エラーを表示する
        if (!data.number.match(/^[0-9]{4}$/)) {
            alert("受付番号は4桁の数字で入力してください。");
            return;
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const rules = {
        required: "受付ナンバーを入力してください",
        pattern: {
            value: /^[0-9]+$/,
            message: "受付ナンバーは半角数字で入力してください",
        },
        minLength: { value: 4, message: "4桁の受付ナンバーを入力してください" },
        maxLength: { value: 4, message: "4桁の受付ナンバーを入力してください" },
    };

    const pwRules = {
        //といっても、パスワードはあっているかどうかは、サーバー側で判定するので、ここでは、パスワードが入力されているかどうかだけを判定する
        required: "パスワードを入力してください",
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {errors.number && (
                        <p className="errormsg" role="alert">
                            {errors.number.message}
                        </p>
                    )}
                    <TextField
                        label="4桁の受付No."
                        type="input"
                        variant="outlined"
                        {...register("number", rules)}
                        sx={{ marginBottom: "10px", width: "100%" }}
                    />
                    {errors.password && (
                        <p className="errormsg" role="alert">
                            {errors.password.message}
                        </p>
                    )}
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
                            {...register("password", pwRules)}
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
            <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to={"/reception/return/select/000"}
                key={"/reception/return/select"}
            >
                返却個数入力画面へ
            </Link>
        </div>
    );
}
