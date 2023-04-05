import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class SigninDto {
    email: string;
    password: string;
    phone: string
    token: string;
}

export class UpdateAccessTokenDto {
    @IsNotEmpty()
    @IsString()
    student_id: Types.ObjectId;
    
    @IsNotEmpty()
    @IsString()
    access_token: string;

    @IsNotEmpty()
    @IsString()
    device_name: string;

    @IsNotEmpty()
    @IsString()
    device_version: string;

    @IsNotEmpty()
    @IsString()
    timezone: string;

    @IsNotEmpty()
    @IsString()
    ip: string;
}