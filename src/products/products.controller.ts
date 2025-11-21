import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Get http://localhost:3000/products?page=1&limit=5
  @Get()
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    if (page && limit) {
      return this.productsService.getProducts(Number(page), Number(limit));
    }
    return this.productsService.getProducts(1, 5);
  }

  // Seed products http://localhost:3000/products/seeder
  @Get('seeder')
  addProduct() {
    return this.productsService.addProduct();
  }

  // Get http://localhost:3000/products/:id
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  // Put http://localhost:3000/products/:id
  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: CreateProductDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  // Delete http://localhost:3000/products/:id
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
