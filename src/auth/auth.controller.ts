import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import requestIp from 'request-ip';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { SigninDto, UpdateAccessTokenDto } from './dto';
import { JwtPayload } from './strategies';
import { Tokens } from './types';

@Controller('student-auth')
export class AuthController {
    constructor(private authService: AuthService){}
    /* @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    async signupLocal(@Body() dto: SignupDto): Promise<Tokens> {
        
        return this.authService.signupLocal(dto);
    } */

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async signinLocal(@Body() {email, password}: SigninDto, @Req() req: Request, @Res() res: Response) {
        if (!req.body.email) {
            this.authService.sendParameterMissing(res);
            return;
        }
    
        let ip = req.ip || requestIp.getClientIp(req) || "IP ADDRESS MISSING";
        ip = ip.replace("::ffff:", "");
        req.body.ip = ip;
        return this.authService.signinLocal({email, password}, res);
    }

    @Put('update-access-token')
    @HttpCode(HttpStatus.OK)
    async updateAccessToken(@Body() dto: UpdateAccessTokenDto, @Req() req: Request, @Res() res: Response) {
        if (!dto.student_id) {
            this.authService.sendParameterMissing(res);
            return;
        }
    
        let ip = req.ip || requestIp.getClientIp(req) || "IP ADDRESS MISSING";
        ip = ip.replace("::ffff:", "");
        req.body.ip = ip;
        return this.authService.updateAccessToken(dto, res);
    }

    @Public()
    @Post('login-with-phone')
    @HttpCode(HttpStatus.OK)
    async loginWithPhone(@Body() dto: SigninDto, @Req() req: Request, @Res() res: Response) {
        if (!dto.phone) {
            this.authService.sendParameterMissing(res);
            return;
        }
    
        let ip = req.ip || requestIp.getClientIp(req) || "IP ADDRESS MISSING";
        ip = ip.replace("::ffff:", "");
        req.body.ip = ip;
        return this.authService.loginWithPhone(dto, res);
    }

/*     @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number) {
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
        return this.authService.refreshTokens(userId, refreshToken)
    } */
}