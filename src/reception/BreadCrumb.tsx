import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Pages, lists } from './Recep_page';


interface BreadCrumbItem {
    text: string;
    href: string;
}

interface BreadCrumbItems extends Array<BreadCrumbItem> { }

export default function BreadCrumb() {


    let pathname = location.pathname.replace(/^\//,"")
    //こいつのコメントアウトを外すと、ホームでもホームのパンくずが表示される。がむしろ混乱を招くのでいらないと思う
    // if(pathname === "") pathname = "/"


    //listsから探索し、階層をArrayで取得する。
    function getBreadCrumbItems(lists: Pages, pathname: string): BreadCrumbItems {

        const ReturnItems: BreadCrumbItems = [];
        for (const list of lists) {
            if (list.href === pathname) {
                ReturnItems.push({ text: list.text, href: list.href });
                break;
            }
            if (list.subPages) {
                const subItems = getBreadCrumbItems(list.subPages, pathname);
                if (subItems.length > 0) {
                    ReturnItems.push({ text: list.text, href: list.href });
                    ReturnItems.push(...subItems);
                    break;
                }
            }
        }
        return ReturnItems;
    }
    const breadCrumbItems = getBreadCrumbItems(lists, pathname);



    return (
    <Breadcrumbs aria-label="breadcrumb" separator=">">
        {breadCrumbItems.splice(0,breadCrumbItems.length - 1).map((item) => {
            return (
                <Link component={RouterLink} underline="hover" color="inherit" to={item.href} key={item.href}>
                {item.text}
                </Link>
            )
        })}

        {breadCrumbItems.length > 0 && (
            <Typography color="text.primary">{breadCrumbItems[breadCrumbItems.length - 1].text}</Typography>
        )}
    
    </Breadcrumbs>
    )
}
