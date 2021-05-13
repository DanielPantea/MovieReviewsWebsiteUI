import { enUserRole } from "./user-role.enum";

export interface User {

    userId: number;
    username: string;
    email: number;
    userRole: enUserRole;
    authdata: string;
}