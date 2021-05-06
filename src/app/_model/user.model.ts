export class User{
    username: string;
    password: string;
    authdata: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
        this.authdata = btoa(`${username}:${password}`);
    }
}