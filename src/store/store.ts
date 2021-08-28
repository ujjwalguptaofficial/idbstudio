import { RootState } from "./states";
import { RootMutation } from "./mutations";
import Vue from "vue";
import { RootTask } from "./task";
import { RootExpression } from "./expression";
import { Godam } from "godam";
import Plugin from "godam-vue";

export const store = new Godam<RootState, RootMutation, RootExpression, RootTask>({
    state: RootState,
    mutations: RootMutation,
    tasks: RootTask,
    expressions: RootExpression
});

Vue.use(Plugin, store);
