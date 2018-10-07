import { addFind } from "./find";
import { addFindIndex } from "./find_index";

export const addPolyfill = () => {
    addFind();
    addFindIndex();
};
