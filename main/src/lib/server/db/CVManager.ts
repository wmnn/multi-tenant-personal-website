import { KEYS } from "../../client/KEYVALUESTORE_KEYS";
import type { CVDataEntry, DB, KeyValueStore } from "../types";

export interface CVData {
    workExperiences: CVDataEntry[],
    education: CVDataEntry[]
}

export interface CVManagerType {
    getCVData: (pageName: string) => Promise<CVData>
}

export class CVManager implements CVManagerType {
    
    private keyValueStore: KeyValueStore;

    constructor(keyValueStore: KeyValueStore) {
        this.keyValueStore = keyValueStore;
    }

    async getCVData(pageName: string): Promise<CVData> {
        try {
            return {
                workExperiences: JSON.parse(await this.keyValueStore.get(pageName, KEYS.workexperience) ?? ''),
                education: JSON.parse(await this.keyValueStore.get(pageName, KEYS.education) ?? '')
            }
        } catch (_) {
            return {
                workExperiences: [],
                education: []
            }
        }
    }

}