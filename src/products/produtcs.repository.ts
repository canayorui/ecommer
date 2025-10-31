import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  //metodo para obtener todos los productos con paginacion
  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  //metodo para obtener un producto por id
  async getProduct(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      return `No se encontro el producto con el id: ${id}`;
    }
    return product;
  }

  //metodo para agregar un producto
  async addProduct() {
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (Category) => Category.name === element.category,
        );
        if (!category) {
          throw new Error(`Categoria ${element.category} no encontrada`);
        }
        // crea un nuevo producto
        await this.productsRepository
          .createQueryBuilder() // createQuerybuilder crea el constructor de consultas
          .insert() // insert => crea una consulta de inserción
          .into(Product) //Especifica la tabla/entidad
          .values({
            name: element.name,
            description: element.description,
            price: element.price,
            stock: element.stock,
            imgUrl: element.imgUrl,
            category: category,
          })
          .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name']) // Si existe, actualiza los campos especificados
          .execute(); // Ejecuta la consulta
      }),
    );
    return 'productos agregados correctamente';
  }

  //este metodo crea un nuevo producto.
  async updateProduct(id: string, productNewData: any) {
    await this.productsRepository.update(id, productNewData);
    // verifica si el producto existe
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    // si no se encuentra el producto, retorna un mensaje
    if (!updatedProduct) return `no se encontro el producto con el id: ${id}`;
    // Object.assign actualiza el producto con los nuevos datos
    Object.assign(updatedProduct, productNewData);
    // retorna el id del producto actualizado
    return id;
  }

  //este metodo elimina un producto por id
  async deleteProduct(id: string): Promise<string> {
    // busca el producto por id
    const product = await this.productsRepository.findOne({ where: { id } });
    // si no se encuentra el producto, retorna un mensaje
    if (!product) return `no se encontro el producto con id: ${id}`;
    // elimina el producto de la base de datos
    await this.productsRepository.remove(product);
    // retorna el id del producto eliminado
    return id;
  }
}
