import { Types } from "mongoose";

export type Student = {
    student_id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
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
    created_date: string;
    app_version: string;
    device_name: string;
    device_version: string;
    timezone: string;
    last_app_opened_time: number;
    last_recorded_ip_address: string;
    last_recorded_location: object;
}

export type StudentLean = {
    _id?: Types.ObjectId;
    student_id: Types.ObjectId;
    email: string;
    password: string;
    student_approval_status: boolean;
    account_on_hold: boolean;
}