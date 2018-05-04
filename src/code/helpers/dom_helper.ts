export class DomHelper {
    getById(id: string) {
        return document.getElementById(id);
    }

    parent(el: HTMLElement) {
        return el.parentElement;
    }

    isHidden(el: HTMLElement) {
        return el.offsetParent === null;
    }

    qry(query: string) {
        return document.querySelector(query);
    }
}