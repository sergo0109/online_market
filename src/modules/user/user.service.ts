import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserCreationException } from './exception/user-creation.exception';
import { UtilsProvider } from '../../providers/utils.provider';


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    @Transactional()
    async create(createDto: CreateDto): Promise<UserEntity> {
        createDto.password = UtilsProvider.generateHash(createDto.password);
        const userEntity = await this.userRepository.create(createDto);
        try {
            await this.userRepository.save(userEntity);
            return userEntity;
        } catch (err) {
            throw new UserCreationException(err);
        }
    }

    async findById(userId: string): Promise<UserEntity> {
        const userEntity = await this.userRepository.findOne({ id: userId });
        if (!userEntity) {
            throw new UserNotFoundException();
        }
        return userEntity;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const userEntity = await this.userRepository.findOne({ email });
        if (!userEntity) {
            throw new UserNotFoundException();
        }
        return userEntity;
    }
}
