import { Expression, Computed } from "godam";
import { RootState } from "./states";

export class RootExpression extends Expression<RootState> {

    @Computed('dbList')
    get dbNames() {
        const names = this.get('dbList').map(q => q.name);
        return names;
    }
}