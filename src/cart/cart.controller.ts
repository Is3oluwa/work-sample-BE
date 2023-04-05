import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Cart } from 'src/models/cart.entity';
import { User } from 'src/models/user.entity';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getItemsInCart(@Req() req): Promise<Cart[]> {
        console.log("here", req.user)
        return await this.cartService.getCart(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addItemToCart(@Body() body, @Req() req): Promise<any> {
        const {productId, quantity} = body 
        // console.log({productId, quantity})
        return await this.cartService.addToCart(productId, quantity, req.user)
    }
}
