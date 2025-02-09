import { KEYS } from "../../client/KEYS";
import type { CVDataEntry, DB, KeyValueStore } from "../types";

export interface CVData {
    workExperiences: CVDataEntry[],
    education: CVDataEntry[]
}

export interface CVManagerType {
    getCVData: () => Promise<CVData>
}

export class CVManager implements CVManagerType {
    
    private keyValueStore: KeyValueStore;

    constructor(keyValueStore: KeyValueStore) {
        this.keyValueStore = keyValueStore;
    }

    async getCVData(): Promise<CVData> {
        try {
            return {
                workExperiences: JSON.parse(await this.keyValueStore.get(KEYS.workexperience) ?? ''),
                education: JSON.parse(await this.keyValueStore.get(KEYS.education) ?? '')
            }
        } catch (_) {
            return {
                workExperiences: [],
                education: []
            }
        }
    }

}