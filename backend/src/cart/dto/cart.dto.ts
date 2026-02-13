import { IsNumber, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CartItemResponseDto {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export class CartSummaryDto {
  items: CartItemResponseDto[];
  totalItems: number;
  totalPrice: number;
}
