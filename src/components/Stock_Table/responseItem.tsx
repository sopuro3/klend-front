import { Equipment } from "@/API/API_interface";
import { GETAPI_equipment } from "@/API/API_interface_rewrite";

export const responseItem: Equipment = {
    equipments: [
        {
            name: "スコップ",
            equipmentId: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,
            plannedQuantity: 0,
            note: "",
        },
        {
            name: "ハンマー",
            equipmentId: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            plannedQuantity: 5,
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            equipmentId: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            plannedQuantity: 10,
            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            equipmentId: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            plannedQuantity: 3,
            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
        // Add more dummy equipment items here
        {
            name: "ドリル",
            equipmentId: "e5f6g7h8-5555-6666-7777-56789abcdefg",
            maxQuantity: 12,
            plannedQuantity: 8,
            currentQuantity: 10,
            note: "これは装備アイテム5です。",
        },
        {
            name: "ノコギリ",
            equipmentId: "f6g7h8i9-6666-7777-8888-6789abcdefghi",
            maxQuantity: 15,
            plannedQuantity: 5,
            currentQuantity: 12,
            note: "これは装備アイテム6です。",
        },
    ],
};
export const GETequipmentItem: GETAPI_equipment = {
    equipments: [
        {
            name: "スコップ",
            equipmentId: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,
            note: "",
        },
        {
            name: "ハンマー",
            equipmentId: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            equipmentId: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            equipmentId: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
        // Add more dummy equipment items here
        {
            name: "ドリル",
            equipmentId: "e5f6g7h8-5555-6666-7777-56789abcdefg",
            maxQuantity: 12,
            currentQuantity: 10,
            note: "これは装備アイテム5です。",
        },
        {
            name: "ノコギリ",
            equipmentId: "f6g7h8i9-6666-7777-8888-6789abcdefghi",
            maxQuantity: 15,
            currentQuantity: 12,
            note: "これは装備アイテム6です。",
        },
    ],
    totalEquipments: 6,
};
