import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";



@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.find();
        return products
    }

    async getProductsById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: {id: id}}); //findOne({where: {id: parseInt(req.params.id, 10)}})
        return product;
    }

    async createProduct(product: Product, user: User): Promise<Product> {
        if(user.role == 'admin') {
        const newProduct = await this.productRepository.save(product);
        return newProduct
    }

    throw new UnauthorizedException();
    
}

    async updateProduct(id: number, product: Product, user: User): Promise<UpdateResult> {
        if(user.role == 'admin') {
        const updatedProduct = await this.productRepository.update(id, product)
        return updatedProduct
        }

        throw new UnauthorizedException();
    }

    async deleteProduct(id: number, user: User): Promise<DeleteResult> {
        if(user.role == 'admin'){
        const deleteProduct = await this.productRepository.delete(id);
        return deleteProduct
    }
    throw new UnauthorizedException();   
    }
}