import { CategoryEnum } from '../../../constants/category.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { IsPrice } from '../../../decorators/validators.decorators';

export class CreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsPrice()
    price: number;

    @ApiProperty({
        type: 'enum',
        enum: CategoryEnum,
        enumName: 'CategoryEnum',
    })
    @IsEnum(CategoryEnum)
    category: CategoryEnum;

    @ApiProperty()
    @IsString()
    description: string;
}
