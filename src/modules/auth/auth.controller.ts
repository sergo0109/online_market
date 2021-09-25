import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {LoginPayloadDto} from './dto/login-payload.dto';
import {UserLoginDto} from './dto/user-login.dto';
import {UserRegisterDto} from './dto/user-register.dto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly authService: AuthService,
    ) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LoginPayloadDto, description: 'Successfully login' })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        return this.authService.userLogin(userLoginDto);
    }

    @Post('/register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: LoginPayloadDto, description: 'Successfully Registered and login' })
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
    ): Promise<LoginPayloadDto> {
        return this.authService.userRegisterAndLogin(userRegisterDto);
    }
}
