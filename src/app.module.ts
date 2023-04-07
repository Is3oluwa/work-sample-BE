import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { Product } from './models/product.entity';
import { User } from './models/user.entity';
import { Order } from './models/order.entity';
import { Cart } from './models/cart.entity';
import { CartModule } from './cart/cart.module';
import { MailModule } from './mail/mail.module';
import { OrderModule } from './order/order.module';
import { ProductSeedModule } from './seeds/products/products.seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: process.env.DATABASE_NAME,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get("POSTGRES_URL"),
          host: configService.get(`POSTGRES_HOST`),
          port: configService.get(`DB_PORT`),
          username: configService.get('POSTGRES_USER'),
          database: configService.get('POSTGRES_DB'),
          password: configService.get('POSTGRES_PASSWORD'),
          entities: [User, Product, Order, Cart],
          synchronize: true,
        };
      },
    }),
    UserModule,
    ProductsModule,
    CartModule,
    MailModule,
    OrderModule,
    ProductSeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
