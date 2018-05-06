export class DomHelper {
    getById(id: string): HTMLElement {
        return document.getElementById(id) as HTMLElement;
    }

    parent(el: HTMLElement): HTMLElement {
        return el.parentElement as HTMLElement;
    }

    isHidden(el: HTMLElement) {
        return el.offsetParent === null;
    }

    qry(query: string) {
        return document.querySelector(query);
    }
}