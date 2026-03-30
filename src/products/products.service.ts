import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './produtcs.repository';
import { CreateProductDto } from 'src/dto/product.dto';
// respondera al PATH: /products

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  //retorna todos los productos
  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }
  //retorna un producto por su id
  getProductById(id: string) {
    return this.productsRepository.getProduct(id);
  }

  createProduct(categoryId: string, createProductDto: CreateProductDto) {
    return this.productsRepository.createProduct(categoryId, createProductDto);
  }

  addProduct() {
    return this.productsRepository.addProduct();
  }

  updateProduct(
    id: string,
    categoryId: string,
    productNewData: CreateProductDto,
  ) {
    return this.productsRepository.updateProduct(
      id,
      categoryId,
      productNewData,
    );
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
