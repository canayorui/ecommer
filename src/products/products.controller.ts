import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    if (page && limit) {
      return this.productsService.getProducts(Number(page), Number(limit));
    }
    return this.productsService.getProducts(1, 5);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Get('seeder')
  addProduct() {
    return this.productsService.addProduct();
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
