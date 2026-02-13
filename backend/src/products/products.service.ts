import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductResponseDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find();
    return products.map(product => this.mapToDto(product));
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  private mapToDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    };
  }
}
