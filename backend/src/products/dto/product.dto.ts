import { IsString, IsNotEmpty, IsNumber, IsUrl, Min } from 'class-validator';

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;
  image: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUrl()
  @IsNotEmpty()
  image: string;
}
