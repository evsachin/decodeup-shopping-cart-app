import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ProductsService } from '../products/products.service';
import { AddToCartDto, CartSummaryDto, CartItemResponseDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async getCart(): Promise<CartSummaryDto> {
    const cartItems = await this.cartItemRepository.find({
      relations: ['product'],
    });

    const items = cartItems.map(item => this.mapToCartItemDto(item));
    
    // Calculate totals on backend (single source of truth)
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    );

    return {
      items,
      totalItems,
      totalPrice: Number(totalPrice.toFixed(2)),
    };
  }

  async addToCart(addToCartDto: AddToCartDto): Promise<CartSummaryDto> {
    const { productId, quantity } = addToCartDto;

    // Validate product exists
    const product = await this.productsService.findOne(productId);

    if (quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    // Check if item already exists in cart
    let cartItem = await this.cartItemRepository.findOne({
      where: { productId },
      relations: ['product'],
    });

    if (cartItem) {
      // Update quantity if item exists
      cartItem.quantity += quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      // Create new cart item
      cartItem = this.cartItemRepository.create({
        productId,
        quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.getCart();
  }

  async removeFromCart(id: number): Promise<CartSummaryDto> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    await this.cartItemRepository.remove(cartItem);
    return this.getCart();
  }

  private mapToCartItemDto(cartItem: CartItem): CartItemResponseDto {
    return {
      id: cartItem.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      product: {
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: Number(cartItem.product.price),
        image: cartItem.product.image,
      },
    };
  }
}
