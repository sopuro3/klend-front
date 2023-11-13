// interface columnName {
//     name: string;
//     content: string;
// }

export class columnItem {
    name: string;
    description: string;
    type: string;
    stock: number;
    requested: number;

    constructor({ name = '', description = '', type = '', stock = 0 }) {
        this.name = name;
        this.requested = 0;
        this.description = description;
        this.type = type;
        this.stock = stock;
    }
}
