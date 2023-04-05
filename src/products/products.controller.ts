import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { ProductService } from 'src/models/products.service';
import { User, UserRole } from 'src/models/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductService) {}

    @Get()
    async getProducts(): Promise<Product[]> {
        return await this.productsService.getAllProducts();
    }

    @Get("/:id") 
    async getHomeById(@Param('id', ParseIntPipe) id: number){
        return await this.productsService.getProductsById(id);
    }
    
    @Post()
    async addNewProduct(@Body() product: Product, user: User): Promise<Product> {
        return await this.productsService.createProduct(product, user)
    }

    @Put('/:id')
    async updateProduct(@Param('id', ParseIntPipe) id: number,@Body() product: Product, user: User):Promise<Product> {
        const validProduct = await this.productsService.updateProduct(id, product, user)
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number, user: User): Promise<DeleteResult> {
        return await this.deleteProduct(id, user)
    }

}