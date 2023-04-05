import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { User, UserRole } from 'src/models/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private ProductRepository: Repository<Product>){}

    async getAllProducts(): Promise<Product[]> {
        return await this.ProductRepository.find()
    }

    async createProduct(product: Product, user: User){
        if (user.role == 'admin') {
            const newProduct = await this.ProductRepository.create(product)
            const saveProduct = await this.ProductRepository.save(newProduct)
 
            return saveProduct     
        }
        throw new UnauthorizedException();

    }

    async getProductById(id: number): Promise<Product> {
        return this.ProductRepository.findOne({
            where: {id: id}
        });
    }

    async updateProductById(id: number, user: User , product: Product): Promise<UpdateResult> {
        if (user.role == 'admin') {
            return await this.ProductRepository.update(id, product);
        }
        throw new UnauthorizedException()
    }

    async delete(id: number, user: User): Promise<DeleteResult> {
        if (user.role == 'admin') {
            return await this.ProductRepository.delete(id);
        }
        throw new UnauthorizedException();
    }
}
