import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// import { lists } from './Recep_page';

export default function BreadCrumb() {

    console.log(location.pathname)

    return (
    <Breadcrumbs aria-label="breadcrumb" separator=">">
    <Link component={RouterLink} underline="hover" color="inherit" to="/">
        個数入力ホーム
    </Link>
    <Link
        component={RouterLink}
        underline="hover"
        color="inherit"
        to="/material-ui/getting-started/installation/"
    >
        個数記入
    </Link>
    <Typography color="text.primary">
        数量確認
    </Typography>
</Breadcrumbs>
    )
}
