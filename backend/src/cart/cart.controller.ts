import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, CartSummaryDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(): Promise<CartSummaryDto> {
    return this.cartService.getCart();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<CartSummaryDto> {
    return this.cartService.addToCart(addToCartDto);
  }

  @Delete(':id')
  async removeFromCart(@Param('id', ParseIntPipe) id: number): Promise<CartSummaryDto> {
    return this.cartService.removeFromCart(id);
  }
}
