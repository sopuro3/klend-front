import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Borrow() {
    return (
        <>
            <Link
                component={RouterLink}
                underline="hover"
                color="inherit"
                to={'/reception/borrow/done'}
                key={'/reception/borrow/done'}
            >
                貸出完了
            </Link>
        </>
    );
}
