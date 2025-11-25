
export class Link {
    id: number;
    url: string;
    name: string;
    constructor(id = 0, url = '', name = '') {
        this.id = id;
        this.url = url;
        this.name = name;
    }
}