import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class SigninDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
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