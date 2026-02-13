import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [DatabaseModule, ProductsModule, CartModule],
})
export class AppModule {}
