export type Case = {
    adress: string; // 被災者宅の住所
    name: string; // 被災者宅の代表者名
    id: string; //uuid。ユーザーには表示しない
    displayId: string; //受付ナンバー数字４桁
    status: string; // 案件の状態
    note: string; //概要
};

// /formをgetした時のレスポンス
export type FormResponse = {
    issue: Case[];
};
