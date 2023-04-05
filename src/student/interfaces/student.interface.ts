import { Types } from "mongoose";

export interface IStudent {
    student_id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    phone2: string;
    password: string;
    date_of_birth: string;
    gender: number;
    country_code: object;
    image: string;
    education: string;
    about_you: string;
    device_token: string;
    device_type: number;
    phone_number_verified: boolean;
    email_verified: boolean;
    referal_code: string;
    student_approval_status: boolean;
    account_deleted: boolean;
    account_status: boolean;
    account_on_hold: boolean;
    access_token: string;
}

export interface IStudentUpdate{
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    phone2?: string;
    password?: string;
    date_of_birth?: string;
    gender?: number;
    country_code?: object;
    image?: string;
    education?: string;
    about_you?: string;
    device_token?: string;
    device_type?: number;
    phone_number_verified?: boolean;
    email_verified?: boolean;
    referal_code?: string;
    student_approval_status?: boolean;
    account_deleted?: boolean;
    account_status?: boolean;
    account_on_hold?: boolean;
    access_token?: string;
}