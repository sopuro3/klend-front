import { EquipmentItem, POSTEquipmentItem } from "./API_interface";

export type EquipmentItem_withQuantity = {
    plannedQuantity: number;
} & EquipmentItem;


export type EquipmentItem_withPlanReturnQuantity = {
    returnQuantity: number;
    plannedQuantity: number; // 必要な数量
} & EquipmentItem;

export type EquipmentSuper = {
    equipmentswithQuantity: EquipmentItem_withPlanReturnQuantity[];
    equipmentsRequired: POSTEquipmentItem[];
};
