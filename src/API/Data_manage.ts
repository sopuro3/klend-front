import { EquipmentItem, POSTEquipmentItem } from "./API_interface";

export type EquipmentItem_withQuantity = {
    plannedQuantity?: number; // 必要な数量
} & EquipmentItem;

export type EquipmentSuper = {
    equipmentswithQuantity: EquipmentItem_withQuantity[];
    equipmentsRequired: POSTEquipmentItem[];
};
