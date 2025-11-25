
export class ProductEntity {
    name:string
    description: string;
    amount: number;
    constructor(
        name:string = '',
        description: string = '',
        amount: number = 0
    ){
        this.name = name;
        this.description = description;
        this.amount = amount;
    }
}