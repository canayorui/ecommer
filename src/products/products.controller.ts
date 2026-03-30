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
  Post,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Get http://localhost:3000/products?page=1&limit=5
  @Get()
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const safePage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;
    const safeLimit = Number.isFinite(limitNum) && limitNum > 0 ? limitNum : 5;
    return this.productsService.getProducts(safePage, safeLimit);
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

  // Post http://localhost:3000/products
  @HttpCode(201)
  @Post()
  createProduct(
    @Body('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.createProduct(categoryId, createProductDto);
  }

  // Put http://localhost:3000/products/:id
  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() product: CreateProductDto,
  ) {
    return this.productsService.updateProduct(id, categoryId, product);
  }

  // Delete http://localhost:3000/products/:id
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
