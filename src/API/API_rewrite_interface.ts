
// 初期調査フォーム

export type surveyPost_info = {
    address: string;
    name: string;
    note: string;
}

export type throwEquipment = {
    equipmentId: string;
    quantity: number;
}

export type surveyPost = {
    issue: surveyPost_info;
    equipments: throwEquipment[];
}

//初期調査フォームここまで


//資器材数取得
// GET /equipment
export type getEquipmentItem = {
    id: string; // uuid
    name: string; // 備品名
    maxQuantity: number; // 必要な数量
    currentQuantity: number; // 必要な数量
    note: string; // 備考
}


export type GETAPI_equipment = {
    equipments: getEquipmentItem[];
    totalEquipments: number;
}
//資器材数取得ここまで

// 案件一覧取得
export type issueItem = {
    address: string;
    name: string;
    id: string;
    displayId: string;
    status: string;
    note: string;
}
export type GETAPI_issue = {
    issue: issueItem[];
    totalIssue: number;
}
// 案件一覧取得ここまで

export type GETAPI_DetermineLend_equipment = 
    getEquipmentItem & {plannedQuantity: number};



// 案件詳細取得

export type GETAPI_detailIssue = {
    issue: issueItem;
    equipments: GETAPI_DetermineLend_equipment[];
    totalEquipments: number;
}

// 案件詳細取得ここまで

// 返却ポスト

export type POST_returnEquipment = {
    equipmentId: string;
    returnQuantity: number;
}

export type POSTAPI_return = {
    equipments: POST_returnEquipment[];
}
// 返却ポストここまで

// 初期調査フォーム

export type POST_surveyInputIssues = {
    address: string;
    name: string;
    note: string;

}

export type POSTAPI_survey = {
    issue: surveyPost_info;
    equipments: throwEquipment[];
}

//初期調査フォームここまで

