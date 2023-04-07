import { Product } from "src/models/product.entity";
import { getRepository } from "typeorm";
import { Products } from "src/data/products";

const seeder = async () => {
    const repo = getRepository(Product)
    const exists = repo.findOne({});

    if (exists) return

    for (const product of Products) {
        const newProduct = repo.create({
            id: product.id,
            image: product.image,
            description: product.description,
            name: product.name,
            price: product.price,
            quantity: product.quantity.toString()
        })

        await repo.save(newProduct);
    }
}

export const productSeeder = async () => {
    await seeder();
}