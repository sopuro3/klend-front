import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './MenuCard.css';
type Props = {
    title: string;
    content: string;
    image: string;
    href: string;
}


const menuList: Props[] = [
    {
        title: "貸出",
        content: "ボランティア様の資器材貸出用フォームです。",
        image: "src\\reception\\asset\\borrow_image.jpg",
        href: "/borrow",
    },
    {
        title: "返却",
        content: "ボランティアおよび個人向け資器材返却用フォームです。",
        image: "src\\reception\\asset\\return_image.jpg",

        href: "/return",
    }
];

export default function MenuCard() {
    return (
        <>
            <div className='CardTitle'>
                <h1>メニュー</h1>
            </div>
            <div className='CardGrid'>
                {menuList.map((menu: Props) => (
                    <ActionAreaCard
                        key={menu.title}
                        title={menu.title}
                        content={menu.content}
                        image={menu.image}
                        href={menu.href}
                    />
                ))}
            </div>
        </>
    );
}


function ActionAreaCard(props: Props) {
    const { title, content, image, href } = props;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea href={href}>
                <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
