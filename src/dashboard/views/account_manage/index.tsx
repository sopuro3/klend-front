import MainCard_ts from "@/dashboard/ui-component/cards/MainCard_ts";
import PageTitle from "@/dashboard/ui-component/original/Pagetitle";


export default function AccountManage() {
  return (
    <>
        <PageTitle title="アカウントの管理"></PageTitle>
        <MainCard_ts>
            <h2>パスワードの変更</h2>
        </MainCard_ts>
    </>
  );
}