import { NotFoundException } from '@nestjs/common';

export class AvailableProductsNotFoundException extends NotFoundException {
    constructor() {
        super('error', 'can not fount available products');
    }
}
