import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './MenuCard.css';
import { Link } from 'react-router-dom';
type CardProps = {
    title: string;
    content: string;
    image: string;
    href: string;
}


const menuList: CardProps[] = [
    {
        title: "貸出",
        content: "ボランティアへの資器材貸出用フォームです。",
        image: "src\\reception\\asset\\borrow_image.jpg",
        href: "/reception/borrow",
    },
    {
        title: "個人用貸出",
        content: "個人への資器材貸出用フォームです。",
        image: "src\\reception\\asset\\borrow_image.jpg",
        href: "/reception/borrow",
    },
    {
        title: "返却",
        content: "ボランティアおよび個人向け資器材返却用フォームです。",
        image: "src\\reception\\asset\\return_image.jpg",

        href: "/reception/return",
    },

];

export default function MenuCard() {
    return (
        <>
            <div className='CardTitle'>
                <h1>メニュー</h1>
            </div>
            <div className='CardGrid'>
                {menuList.map((menu: CardProps) => (
                    <Link key={menu.title} to={menu.href}>
                        {/* なぜエラーが出るのか分らない */}

                        <ActionAreaCard
                            title={menu.title}
                            content={menu.content}
                            image={menu.image}
                            href={menu.href}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}


function ActionAreaCard(props: CardProps) {
    const { title, content, image} = props;
    return (
        <Card sx={{ width: 345,maxWidth:345 }}>
            <CardActionArea sx={{ padding: 1, background: "#f8f8f8",display:"flex",flexDirection:"column" }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={title}
                />
                <CardContent sx={{flexGrow:1}}>
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
