import { Done } from '@mui/icons-material';
import { Container, Box } from '@mui/material';

export default function Borrow_complete() {
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '15vh' }}>
                    <Done sx={{color:"green", fontSize:"50px"}} />

                </Box>
            </Container>

        </>
    );
}
