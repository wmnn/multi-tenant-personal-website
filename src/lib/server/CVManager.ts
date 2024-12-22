import type { CVDataEntry, DB, KeyValueStore } from "./types";

export interface CVData {
    workExperiences: CVDataEntry[],
    education: CVDataEntry[]
}

export interface CVManagerType {
    getCVData: () => Promise<CVData>
}

const CV_DATA_KEY = 'cv';

export class CVManager implements CVManagerType {
    
    private keyValueStore: KeyValueStore;

    constructor(keyValueStore: KeyValueStore) {
        this.keyValueStore = keyValueStore;
    }

    async getCVData(): Promise<CVData> {
        try {
            return JSON.parse(await this.keyValueStore.get(CV_DATA_KEY));
        } catch (_) {
            return {
                workExperiences: [],
                education: []
            }
        }
    }

    updateCVData() {

    }
}