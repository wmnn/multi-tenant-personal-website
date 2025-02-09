import type { CategoryEntry } from "$lib/server/singleton";

export interface CreateAndUpdatePostReqData {
    id?: number,
    title: string,
    content: string,
    categoryEntries: Array<CategoryEntry>
}