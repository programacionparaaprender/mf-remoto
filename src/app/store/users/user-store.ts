export class UserStore {
    name:string;
    password:string
    constructor(name:string="", password=""){
       this.name = name;
       this.password = password; 
    }
}