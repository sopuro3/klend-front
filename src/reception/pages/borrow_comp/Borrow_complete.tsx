
import './done.css'
import './borrow_complete.css'
import { Card, CardContent, Typography, createTheme } from '@mui/material';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  


export default function Borrow_complete() {
    return (
        <>
            <div className="main-container">
                <div className="check-container">
                    <div className="check-background">
                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="check-shadow"></div>
                </div>
            </div>

            <div className="text-container">
                手続きが完了しました！
            </div>
            <br></br>
            <Card sx={{maxWidth:300,margin:"auto",padding:"10px",background: "#f8f8f8"}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        受付番号
                    </Typography>
                    <Typography variant="h4">
                        3218
                    </Typography>
                    <Typography>
                        この受付番号を控えてください。
                    </Typography>
                </CardContent>

            </Card>
        </>
    );
}


//https://codepen.io/Hellwinkel/pen/KKaNNKb

