import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { UserEntity } from '../user/user.entity';
import { ProductDto } from './dto/product.dto';
import { CategoryEnum } from '../../constants/category.enum';


@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity<ProductDto> {
    @Column({ type: 'uuid' })
    @Index()
    userId: string;

    @Column()
    name: string;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    price: number;

    @Column({ type: 'enum', enum: CategoryEnum })
    category: CategoryEnum;

    @Column()
    description: string;

    @ManyToOne(
        () => UserEntity,
        (userEntity) => userEntity.products,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    )
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    dtoClass = ProductDto;
}
