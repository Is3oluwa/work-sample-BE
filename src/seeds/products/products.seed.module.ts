import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { ProductSeederService } from './products.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductSeederService],
  exports: [ProductSeederService]
})
export class ProductSeedModule {}
