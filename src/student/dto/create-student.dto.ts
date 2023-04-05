import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    readonly student_id: string;
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @IsNotEmpty()
    @IsString()
    readonly last_name: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly phone: string;

    @IsString()
    readonly phone2: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsString()
    readonly date_of_birth: string;

    @IsNumber()
    readonly gender: number;

    @IsObject()
    readonly country_code: object;

    @IsString()
    readonly image: string;

    @IsString()
    readonly education: string;

    @IsString()
    readonly about_you: string;

    @IsString()
    readonly device_token: string;

    @IsNumber()
    readonly device_type: number;

    @IsBoolean()
    readonly phone_number_verified: boolean;

    @IsBoolean()
    readonly email_verified: boolean;

    @IsString()
    readonly referal_code: string;

    @IsBoolean()
    readonly student_approval_status: boolean;

    @IsBoolean()
    readonly account_deleted: boolean;

    @IsBoolean()
    readonly account_status: boolean;

    @IsBoolean()
    readonly account_on_hold: boolean;

    @IsString()
    readonly access_token: string;

}
