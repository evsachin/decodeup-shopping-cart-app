import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from '../products/product.entity';
import { CartItem } from '../cart/cart-item.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'shopping_cart',
  entities: [Product, CartItem],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
