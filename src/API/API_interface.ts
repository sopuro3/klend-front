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
export type EquipmentItem = {
    id: string; // uuid
    name: string; // 備品名
    /**
     * 変数名からもわかる通り、この値は最大値を表すが当然整数型である。
     */
    maxQuantity: number;
    /**
     * 変数名からもわかる通り、この値は最大値を表すが当然整数型である。
     */
    currentQuantity: number;
    PlannedQuantity: number; // 必要な数量
    note?: string; // 備考
};

export type Equipment = {
    equipments: EquipmentItem[];
};

//必要な数量を返すEquipmentItem
export type POSTEquipmentItem = {
    id: string; // uuid
    quantity: number; // 必要な数量
};

export type POSTEquipment = {
    equipments: POSTEquipmentItem[];
};

// GET /equipment end

// GET /equipment/:id
export type EquipmentInvividual = {
    name: string;
    currentQuantiy: number;
    maxQuantity: number;
    note?: string;
};

// POST /form/survey
export type LendForm = {
    name: string;
    address: string;
    note: string;
} & POSTEquipment;
