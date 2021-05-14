import { DemoService } from "../service/demo_service";

export const actions = {
    async getDbList({ commit }) {
        var demoServiceInstance = new DemoService();
        let list = [{
            name: "Demo",
            version: 1
        }];
        try {
            list = await demoServiceInstance.getDbList();
        } catch (error) {

        }
        commit("SET_DB_LIST", list);
    }
}