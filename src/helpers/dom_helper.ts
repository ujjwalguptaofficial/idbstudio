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

    removePx(value: string) {
        parseInt(value, 10);
    }

    copyToClipboard(value: string) {
        const el = document.createElement('textarea');
        el.value = value;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}