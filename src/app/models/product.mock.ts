import { faker } from '@faker-js/faker';

import { Product } from './product.model'

export const generateOneProduct = (): Product => {
    return {
        id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        category: {
            id: faker.datatype.number(),
            name: faker.commerce.department()
        },
        description: faker.commerce.productDescription(),
        images: [ faker.image.imageUrl() , faker.image.imageUrl()],
        price: parseInt( faker.commerce.price(), 10)
    }
}

export const generateManyProducts = (size = 10): Product[] => {
    const products: Product[] = []

    for(let i = 0; i < size; i++) {
        products.push(generateOneProduct())
    }

    return [...products];

}