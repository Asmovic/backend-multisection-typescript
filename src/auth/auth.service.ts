import { ForbiddenException, BadRequestException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Response } from 'express';
import { ISignin } from './interfaces';
import { Tokens } from './types';
import { Student, StudentLean } from 'src/student/types';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from 'src/student/student.service';
import {statusCode, statusMessage, statusResponseObjects } from 'src/utilities/util';
import { Types } from 'mongoose';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private studentService: StudentService){}

    async sendToken(user?: StudentLean): Promise<Tokens> {
        const tokens = await this.getTokens(user.student_id.toString() || '', user.email || '')
        /* await this.updateAtHash(user.student_id, tokens.access_token) */
        return tokens;
    }

    async updateAtHash(userId: Types.ObjectId, at: string) {
        const hash = await this.studentService.hashData(at);
        
         return await this.studentService.update(userId, { access_token: hash})
        
    }

    async getTokens(userId: string, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([this.jwtService.signAsync({
            sub: userId,
            email
        },
        {
            secret: process.env.AT_SECRET,
            expiresIn: 60 * 15
        }), this.jwtService.signAsync({
            sub: userId,
            email
        },
        {
            secret: process.env.RT_SECRET,
            expiresIn: 7 * 24 * 60 * 60
        })])
        return { access_token: at, refresh_token: rt }
    }

    /** API to login student using email id **/
    async signinLocal(data: ISignin, res: Response) {
        
        const user = await this.studentService.findByEmail(data.email, {
            student_id: 1,
            password: 1,
            student_approval_status: 1,
            account_on_hold: 1,
        }, {});

        if(!user) throw new ForbiddenException("Access Denied");
        const passwordMatches = await bcrypt.compare(data.password, user.password);
        if(!passwordMatches) throw new ForbiddenException("Access Denied");

        if (user.student_approval_status === false || user.account_on_hold) {
            throw new BadRequestException(statusMessage.ACCOUNT_LOCKED)
        }
        delete user.password;
        
        const token = await this.sendToken(user);


        const dataToSet = {
            $set: {
                access_token: token.access_token,
                app_version: data.app_version ? data.app_version : "",
                last_app_opened_time: new Date().getTime(),
                last_recorded_ip_address: data.ip || "",
                device_name: data.device_name || "",
                device_version: data.device_version || "",
            }
        };

        
        const updatedStudent = await this.studentService.updateByStudId(user.student_id.toString(), dataToSet, {});
        console.log("updatedStudent", updatedStudent)

        const result = {
            first_name: updatedStudent.first_name,
            last_name: updatedStudent.last_name,
            referal_code: updatedStudent.referal_code,
            student_id: updatedStudent.student_id,
            image: updatedStudent.image,
            country_code: updatedStudent.country_code,
            access_token: updatedStudent.access_token,
            account_status: updatedStudent.account_status
        };

        res.send({
            "statusCode": statusCode.OK,
            "statusMessage": statusMessage.LOGGED_IN,
            "result": result,
            "token": token
        })

    }

    /** API to login student using email id **/
    async loginWithPhone(data: ISignin, res: Response) {
        data.phone = data.phone.replace(/\s+/g, '');


        if(!data.token) throw new ForbiddenException("Access Denied");

        const user = await this.studentService.findByPhone(data.phone, {
            _id: 0,
            student_id: 1,
            student_approval_status: 1,
            account_on_hold: 1,
        }, {});

        if(!user) throw new ForbiddenException("Access Denied");

        if (user.student_approval_status === false || user.account_on_hold) {
            throw new BadRequestException(statusMessage.ACCOUNT_LOCKED)
        }
    
        
        
        const token = await this.sendToken(user);

        const dataToSet = {
            $set: {
                access_token: token.access_token,
                app_version: data.app_version ? data.app_version : "",
                last_app_opened_time: new Date().getTime(),
                last_recorded_ip_address: data.ip || "",
                device_name: data.device_name || "",
                device_version: data.device_version || "",
            }
        };

        
        const updatedStudent = await this.studentService.updateByPhone(data.phone, dataToSet, {});
        console.log("updatedStudent", updatedStudent)

        const result = {
            first_name: updatedStudent.first_name,
            last_name: updatedStudent.last_name,
            referal_code: updatedStudent.referal_code,
            student_id: updatedStudent.student_id,
            image: updatedStudent.image,
            country_code: updatedStudent.country_code,
            access_token: updatedStudent.access_token,
            account_status: updatedStudent.account_status
        };

        res.send({
            "statusCode": statusCode.OK,
            "statusMessage": statusMessage.LOGGED_IN,
            "result": result,
            "token": token
        })

    }
    

    async updateAccessToken({
        student_id,
        access_token,
        device_name,
        device_version,
        timezone,
        ip,
    }, res: Response) {
        const new_token =  await this.sendToken();

        const dataToSet = {
            access_token: new_token.access_token,
            device_name: device_name || "",
            device_version: device_version || "",
            timezone: timezone || "",
            last_app_opened_time: new Date().getTime(),
            last_recorded_ip_address: ip || "",
        };

        const sData = await this.studentService.updateByMultiCriteria({ student_id,
            access_token}, dataToSet, {});

            if(!sData) throw new HttpException(statusMessage.LOGIN_EXPIRED, HttpStatus.BAD_REQUEST);

            let lat: number;
            let lng: number;
        
            try {
                lat = sData.location.coordinates[1];
                lng = sData.location.coordinates[0];
            } catch (e) {
                lat = -33.8708;
                lng = 151.2073;
            }
            res.send({
                "statusCode": statusCode.OK,
                "statusMessage": statusMessage.DATA_UPDATED,
                access_token: new_token,
                lat: lat,
                lng: lng,
                account_status: sData.account_status || false,
            })

    }
    

/*     async logout(userId: number) {
        return await this.studentService.updateByIdAndHashedRt(userId);
    } */

    randomIdGenerator() {
        return crypto.randomBytes(30).toString('base64');
    }

    sendParameterMissing(res: Response) {
        res.send({ "statusCode": 401, "statusMessage": "Parameters are missing" });
    }
    
    sendServerBusy(err: Error, cb: any) {
        if (err) {
            cb(statusResponseObjects.serverBusy);
            return true;
        } else {
            return false;
        }
    }


}
