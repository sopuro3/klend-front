// GET /form  

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


// GET /form   end

// GET /equipment
export type Equipment = {
    equipments:[{
		id: string // uuid
        /**
         * 変数名からもわかる通り、この値は最大値を表すが当然整数型である。
         */
		maxQuantity: number
        /**
         * 変数名からもわかる通り、この値は最大値を表すが当然整数型である。
         */
		currentQuantity: number 
        notes: string // 備考
	}]
}
// GET /equipment end

// GET /equipment/:id
