import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Order } from 'src/models/order.entity';
import { User } from 'src/models/user.entity';
import { OrderService } from './order.service';
import { MailService } from 'src/mail/mail.service';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private mailService: MailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async order(@Request() req): Promise<Order> {
    return await this.orderService.order(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOrders(@Request() req): Promise<any> {
    return await this.orderService.getOrders(req.user.name);
    // return await this.mailService.sendOrderConfirmation(user)
  }
}
