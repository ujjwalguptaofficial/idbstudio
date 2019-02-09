import { STORE_MUTATION } from "../enums/store_mutation";
import { StateOption } from "../types/state_option";

export const mutations = {
    [STORE_MUTATION.SetActiveDb]: (state: StateOption, value: string) => {
        state.activeDbName = value;
    },
    [STORE_MUTATION.SetPageLoaded]: (state: StateOption, value: boolean) => {
        state.isPageLoaded = value;
    }
}