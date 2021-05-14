import { STORE_MUTATION } from "../enums/store_mutation";
import { StateOption } from "../types/state_option";

export const mutations = {
    [STORE_MUTATION.SetActiveDb]: (state: StateOption, value: string) => {
        state.activeDbName = value;
    },
    [STORE_MUTATION.SetPageLoaded]: (state: StateOption, value: boolean) => {
        state.isPageLoaded = value;
    },
    [STORE_MUTATION.SetActiveTab]: (state: StateOption, value: number) => {
        state.activeTab = value;
    },
    [STORE_MUTATION.SetResultContainerHeight]: (state: StateOption, value: number) => {
        state.resultContainerHeight = value;
    },
    SET_DB_LIST(state, value) {
        state.dbList = value;
    },
    ADD_DB(state, value) {
        state.dbList.push(value)
    }
};