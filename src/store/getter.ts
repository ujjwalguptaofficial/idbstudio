export const getter = {
    dbNames(state) {
        const names = state.dbList.map(q => q.name);
        return names;
    }
}