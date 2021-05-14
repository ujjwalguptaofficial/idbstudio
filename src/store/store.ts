import Vuex from "vuex";
import { states } from "./states";
import { mutations } from "./mutations";
import Vue from "vue";
import { actions } from "./actions";
import { StateOption } from "../types/state_option";
import { getter } from "./getter";
Vue.use(Vuex);

export const store = new Vuex.Store<StateOption>({
    state: states,
    mutations: mutations,
    actions: actions,
    getters: getter
});