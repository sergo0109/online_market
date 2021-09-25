import { UserLoginDto } from './user-login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsFullName } from '../../../decorators/validators.decorators';

export class UserRegisterDto extends UserLoginDto {
    @ApiProperty()
    @IsFullName()
    fullName: string;
}
