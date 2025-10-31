import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './produtcs.repository';
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

  addProduct() {
    return this.productsRepository.addProduct();
  }

  updateProduct(id: string, productNewData: any) {
    return this.productsRepository.updateProduct(id, productNewData);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
