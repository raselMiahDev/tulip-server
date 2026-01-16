import {Types} from "mongoose";

export interface IUserProfile {
    user_id: Types.ObjectId;
    phone_number: string;
    depo_name:string;
    zone: string;
    depo_location: string;
    bank_account: string;
    image: string;
}