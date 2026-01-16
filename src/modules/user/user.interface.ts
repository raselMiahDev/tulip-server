export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "in_charge" | "user";
}
