type Props = {
    text: string;
};

export default function ReturnEmpty(props: Props) {
    return (
        <>
            <p>空のページ</p>
            <p>{props.text}</p>
        </>
    );
}
