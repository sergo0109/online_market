import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { CreateDto } from './dto/create.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import {AvailableProductsNotFoundException} from "./exception/available-products-not-found.exception";

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    @Transactional()
    async create(userId: string, createDto: CreateDto): Promise<ProductDto> {
        const productEntity = await this.productRepository.create({ userId, ...createDto });
        try {
            await this.productRepository.save(productEntity);
            return productEntity.toDto();
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async getAvailableProductsForUser(userId: string): Promise<ProductDto[]> {
        const productsEntities = await this.productRepository.createQueryBuilder('product')
            .where('product.userId != :userId', { userId })
            .getMany()

        if (!productsEntities.length) {
            throw new AvailableProductsNotFoundException();
        }

        return productsEntities.map(productEntity => productEntity.toDto());
    }
}
