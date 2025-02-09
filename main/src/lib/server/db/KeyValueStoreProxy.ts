import type { CVData } from "./CVManager";
import type { KeyValueStore } from "../types";

class KeyValueStoreProxy {

    private keyValueStore: KeyValueStore;

    constructor(keyValueStore: KeyValueStore) {
        this.keyValueStore = keyValueStore;
    }
}