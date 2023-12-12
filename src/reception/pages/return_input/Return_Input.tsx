import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";

export default function 返却時のナンバー入力画面() {
    return (
        <>
            <h3>受付番号の入力</h3>
            <p>書類に記されている受付ナンバーを入力してください。</p>

            <Card
                sx={{
                    maxWidth: 300,
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
};

function App() {
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="outlined-basic"
                    label="4桁の数字"
                    type="number"
                    variant="outlined"
                    {...register("number")}
                />
                <Button variant="text" type="submit">
                    決定
                </Button>
            </form>
        </div>
    );
}
