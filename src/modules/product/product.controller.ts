import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Auth } from '../../decorators/http.decorators';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { CreateDto } from './dto/create.dto';
import { RoleEnum } from '../../constants/role.enum';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

@Controller('products')
@ApiTags('products')
export class ProductController {
    constructor(public readonly productService: ProductService) {};

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Auth()
    @ApiOkResponse({ type: ProductDto, description: 'Product creation' })
    async create(@AuthUser() user: UserEntity, @Body() createDto: CreateDto): Promise<ProductDto> {
        return this.productService.create(user.id, createDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: ProductDto, description: 'get available products for current user' })
    @Auth(RoleEnum.CUSTOMER)
    async getAvailableProductsForUser(@AuthUser() user: UserEntity): Promise<ProductDto[]> {
        return this.productService.getAvailableProductsForUser(user.id);
    }
}
