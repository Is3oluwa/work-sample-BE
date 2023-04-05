import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/models/cart.entity';
import { User } from 'src/models/user.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private productsService: ProductsService,
  ) {}

  async addToCart(
    productId: number,
    quantity: number,
    user: { id: number; name: string },
  ) {
    const cartItems = await this.cartRepository.find({
      relations: ['user', 'product'],
    });
    const product = await this.productsService.getProductById(productId);
    const authUser = await this.userRepository.findOne({
      where: { name: user.name },
    });

    if (productId) {
      const cart = cartItems.filter(
        (product) =>
          product.product.id === productId && product.user.name === user.name,
      );

      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.product = product;

        return await this.cartRepository.save(newItem);
      } else {
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].total * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }

  async getCart(user: number): Promise<Cart[]> {
    const cart = await this.cartRepository.find({
      relations: ['user', 'product'],
      where: { user: { id: user } },
    });
    return cart;
  }

  async clearCart(userId: number) {
    await this.cartRepository.delete({ user: { id: userId } })
  }
  //
}
