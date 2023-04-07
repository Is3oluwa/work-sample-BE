import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/data/products';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductSeederService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  async seed() {
    const exists = await this.repo.find();

    if (exists) return;

    for (const product of Products) {
      const newProduct = this.repo.create({
        id: product.id,
        image: product.image,
        description: product.description,
        name: product.name,
        price: product.price,
        quantity: product.quantity.toString(),
      });

      await this.repo.save(newProduct);
    }
  }
}
