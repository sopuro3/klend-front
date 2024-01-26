import {
    GETAPI_equipment,
    GETAPI_issue,
    POSTAPI_return,
    detailIssue,
    surveyPost,
} from "./API_interface_rewrite";
import { authAxios } from "./axios";

export async function fetchEquipments(): Promise<GETAPI_equipment> {
    const response = await authAxios.get("/equipment");
    return response.data;
}

export async function fetchDetailIssue(id: string): Promise<detailIssue> {
    const response = await authAxios.get("/issue/" + id);
    return response.data;
}

export async function fetchIssueList(): Promise<GETAPI_issue> {
    const response = await authAxios.get("/issue");
    return response.data;
}
export type PUTequip = {
    name: string;
    maxQuantity: number;
    note: string;
};

export async function PUTEquipments(
    id: string,
    PUTequip: PUTequip,
): Promise<void> {
    const response = await authAxios.put("/equipment/" + id, PUTequip);
    return response.data;
}

export async function PUTPrint(id: string): Promise<void> {
    const response = await authAxios.put("/issue/" + id, {});
    return response.data;
}

export async function POSTSurvey(issue: surveyPost) {
    const response = await authAxios.post("/issue/survey", issue);
    return response.data;
}

export async function PATCHIssue(id: string, issue: surveyPost) {
    const response = await authAxios.patch("/issue/" + id, issue);
    return response.data;
}

export async function POSTReturn(id: string, returnEquipment: POSTAPI_return) {
    const response = await authAxios.post(
        "/issue/" + id + "/return",
        returnEquipment,
    );
    return response.data;
}
