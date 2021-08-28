import { Mutation } from "godam";
import { RootState } from "./states";

export class RootMutation extends Mutation<RootState> {
    setActiveDb(value: string) {
        this.state.activeDbName = value as any;
    }
    setPageLoaded(value: boolean) {
        this.state.isPageLoaded = value;
    }
    setActiveTab(value: number) {
        this.state.activeTab = value;
    }
    setResultContainerHeight(value: number) {
        this.state.resultContainerHeight = value;
    }
    SET_DB_LIST(value) {
        this.state.dbList = value;
    }
    ADD_DB(value) {
        this.state.dbList.push(value)
    }
};