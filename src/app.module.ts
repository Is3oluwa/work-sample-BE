import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { Product } from './models/product.entity';
import { ProductsController } from './products/products.controller';
import {} from 'reflect-metadata'
import { User } from './models/user.entity';
import { Order } from './models/order.entity';
import { Cart } from './models/cart.entity';
import { ProductService } from './models/products.service';
import { AuthController } from './user/auth/auth.controller';
import { AuthService } from './user/auth/auth.service';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { CartModule } from './cart/cart.module';
import { MailModule } from './mail/mail.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'postgres',
      entities: [User, Product, Order, Cart],
      synchronize: false, // never use TRUE in production!
  }),
    UserModule,
    ProductsModule,
    CartModule,
    MailModule,
    OrderModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
