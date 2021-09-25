import { AbstractDto } from '../../common/dtoes/abstract.dto';
import { ProductEntity } from '../product.entity';
import { CategoryEnum } from '../../../constants/category.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto extends AbstractDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    description: string;

    @ApiProperty({
        type: 'enum',
        enum: CategoryEnum,
        enumName: 'CategoryEnum',
    })
    category: CategoryEnum;

    constructor(productEntity: ProductEntity) {
        super(productEntity);

        this.userId = productEntity.userId;
        this.name = productEntity.name;
        this.price = productEntity.price;
        this.description = productEntity.description;
        this.category = productEntity.category;
    }

}
