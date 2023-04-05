import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { MailService } from 'src/mail/mail.service';
import { Order } from 'src/models/order.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private cartService: CartService,
    private mailService: MailService
  ) {}

  async order(user: number): Promise<any> {
    const usersOrder = await this.orderRepository.find({ relations: ['user'] });
    const userOrder = usersOrder.filter((order) => order.user?.id === user);

    const cartItems = await this.cartService.getCart(user);
    const subTotal = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next);

    const authUser = await this.userRepository.findOne({
      where: { id: user },
    });

    const cart = cartItems.map((item) => {
      return { ...item.product, quantity: item.quantity }
    });

    if (userOrder.length === 0) {
      const newOrder = this.orderRepository.create({ total: subTotal, user: authUser, date: new Date() });
      const orders = await this.orderRepository.save(newOrder);
      await this.mailService.sendOrderConfirmation({
        to: authUser.email,
        products: cart,
        totalPrice: subTotal
      })
      await this.cartService.clearCart(user);
      return orders
    } else {
      const existingOrder = userOrder.map((item) => item);
      await this.orderRepository.update(existingOrder[0].id, {
        total: existingOrder[0].total + cart[0].price,
      });
      await this.mailService.sendOrderConfirmation({
        to: authUser.email,
        products: cart,
        totalPrice: subTotal
      })
      await this.cartService.clearCart(user);
      return { message: 'order modified' };
    }
  }

  async getOrders(user: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    return orders.filter((order) => order.user?.name === user);
  }
}
