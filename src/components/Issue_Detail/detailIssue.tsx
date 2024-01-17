import { detailIssue } from "@/API/API_interface_rewrite";

export const detailIssueDummy: detailIssue = {
    issue: {
        address: "久留米市小森野1丁目1-1",
        name: "Jane Smith",
        id: "234e5678-e89b-12d3-a456-426614174002",
        displayId: "0002",
        status: "su",
        note: "Another sample issue.",
    },
    equipments: [
        {
            name: "スコップ",
            id: "a1b2c3d4-1111-2222-3333-123456789abc",
            maxQuantity: 10,
            currentQuantity: 5,
            plannedQuantity: 0,
            note: "",
        },
        {
            name: "ハンマー",
            id: "b2c3d4e5-2222-3333-4444-23456789abcd",
            maxQuantity: 20,
            currentQuantity: 15,
            plannedQuantity: 5,
            note: "長い名前の資機材の概要だよ長い名前の資機材の概要だよ",
        },
        {
            name: "ドライバー",
            id: "c3d4e5f6-3333-4444-5555-3456789abcde",
            maxQuantity: 8,
            plannedQuantity: 10,
            currentQuantity: 3,
            note: "これは装備アイテム3です。",
        },
        {
            name: "ペンチ",
            id: "d4e5f6g7-4444-5555-6666-456789abcdef",
            maxQuantity: 25,
            plannedQuantity: 3,
            currentQuantity: 20,
            note: "これは装備アイテム4です。",
        },
        // Add more dummy equipment items here
        {
            name: "ドリル",
            id: "e5f6g7h8-5555-6666-7777-56789abcdefg",
            maxQuantity: 12,
            plannedQuantity: 8,
            currentQuantity: 10,
            note: "これは装備アイテム5です。",
        },
        {
            name: "ノコギリ",
            id: "f6g7h8i9-6666-7777-8888-6789abcdefghi",
            maxQuantity: 15,
            plannedQuantity: 5,
            currentQuantity: 12,
            note: "これは装備アイテム6です。",
        },
    ],
    totalEquipments: 6,
};
