import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { ProductEntity } from '../product/product.entity';
import { UserDto } from './dto/user.dto';
import { RoleEnum } from '../../constants/role.enum';
import { UtilsProvider } from '../../providers/utils.provider';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto>{
    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type:'enum', enum: RoleEnum })
    role: RoleEnum;

    @OneToMany(
        () => ProductEntity,
        (productEntity) => productEntity.user,
    )
    products: ProductEntity[];

    dtoClass = UserDto;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        return UtilsProvider.generateHash(this.password);
    }
}
